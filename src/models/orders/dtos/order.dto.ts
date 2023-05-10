import {Expose, Type} from "class-transformer";
import {OrdersProductDto} from "./orders-product.dto";
import {OrdersUserDto} from "./orders-user.dto";

export class OrderDto {
    @Expose()
    orderId: number;

    @Expose()
    date: Date;

    @Expose()
    shipped: boolean;

    @Expose()
    price: number;

    @Expose()
    @Type(() => OrdersProductDto)
    products: OrdersProductDto[];

    @Expose()
    @Type(() => OrdersUserDto)
    user: OrdersUserDto;
}