import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./order.entity";
import {Product} from "../products/product.entity";

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repo: Repository<Order>) {
    }

    //date, shipped, userId, price
    async create(userId: number, products: Product[]) {
        let price = 0;
        for (const product of products) {
            price += product.price;
        }
        const furType = this.repo.create({userId, products, price, date: new Date()});
        return this.repo.save(furType);
    }

    findById(id: number) {
        return this.repo.findOne({orderId: id});
    }

    find(attrs?: Partial<Order>) {
        return this.repo.find(attrs);
    }

    async update(id: number, attrs: Partial<Order>) {
        const order = await this.findById(id);
        if (!order) {
            throw new NotFoundException('order not found');
        }
        Object.assign(order, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(order);
    }

    async remove(id: number) {
        const order = await this.findById(id);
        if (!order) {
            throw new NotFoundException('order not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return this.repo.remove(order);
    }
}
