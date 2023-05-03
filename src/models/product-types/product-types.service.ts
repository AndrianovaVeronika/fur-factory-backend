import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductType} from "./product-type.entity";

@Injectable()
export class ProductTypesService {
    constructor(@InjectRepository(ProductType) private repo: Repository<ProductType>) {
    }

    async create(name) {
        const productType = this.repo.create({name});
        return this.repo.save(productType);
    }

    findById(id: number) {
        return this.repo.findOne({productTypeId: id});
    }

    find(attrs?: Partial<ProductType>) {
        return this.repo.find(attrs);
    }

    async update(id: number, attrs: Partial<ProductType>) {
        const productType = await this.findById(id);
        if (!productType) {
            throw new NotFoundException('productType not found');
        }
        Object.assign(productType, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(productType);
    }

    async remove(id: number) {
        const productType = await this.findById(id);
        if (!productType) {
            throw new NotFoundException('productType not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return this.repo.remove(productType);
    }
}
