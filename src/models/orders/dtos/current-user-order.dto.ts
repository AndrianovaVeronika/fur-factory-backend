import {Expose, Type} from "class-transformer";
import {OrdersProductDto} from "./orders-product.dto";

export class CurrentUserOrderDto {
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
}