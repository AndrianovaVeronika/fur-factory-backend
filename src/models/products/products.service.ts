import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {
    }

    async create(name: string, price: number) {
        const user = this.repo.create({name, price});
        return this.repo.save(user);
    }

    findById(id: number) {
        return this.repo.findOne({productId: id});
    }

    find(attrs?: Partial<Product>) {
        return this.repo.find(attrs);
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
