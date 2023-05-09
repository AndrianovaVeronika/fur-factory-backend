import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Between, Repository} from "typeorm";
import {FindProductDto} from "./dtos/find-product.dto";
import {GenderCategory} from "../gender-categories/gender-category.entity";
import {FurType} from "../fur-types/fur-type.entity";
import {ProductType} from "../product-types/product-type.entity";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {
    }

    async create(name: string, price: number, productType: ProductType, genderCategory: GenderCategory, furType: FurType) {
        const user = await this.repo.create({name, price, productType, genderCategory, furType});
        return this.repo.save(user);
    }

    findById(id: number) {
        return this.repo.findOne({
            where: {productId: id},
            relations: ['productType', 'genderCategory', 'furType']
        });
    }

    find(attrs?: FindProductDto) {
        const findProductWhere = {
            ...(attrs?.name && {name: attrs.name}),
            ...(attrs?.priceRange && {price: Between(attrs.priceRange[0], attrs.priceRange[1])}),
            ...(attrs?.productTypeId && {productType: {productTypeId: attrs.productTypeId}}),
            ...(attrs?.furTypeId && {furType: {furTypeId: attrs.furTypeId}}),
            ...(attrs?.genderCategoryId && {genderCategory: {genderCategoryId: attrs.genderCategoryId}})
        };
        return this.repo.find({
            relations: ['productType', 'genderCategory', 'furType'],
            where: findProductWhere
        });
    }

    async update(id: number, attrs: Partial<Product>) {
        const product = await this.findById(id);
        if (!product) {
            throw new NotFoundException('product not found');
        }
        Object.assign(product, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(product);
    }

    async remove(id: number) {
        const product = await this.findById(id);
        if (!product) {
            throw new NotFoundException('product not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return this.repo.remove(product);
    }
}
