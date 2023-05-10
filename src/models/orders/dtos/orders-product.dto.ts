import {Expose} from "class-transformer";

export class OrdersProductDto {
    @Expose()
    productId: number;

    @Expose()
    name: string;

    @Expose()
    price: number;
}