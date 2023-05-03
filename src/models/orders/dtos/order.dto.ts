import {Expose} from "class-transformer";
import {Product} from "../../products/product.entity";

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
    products: Product[];

    @Expose()
    user: {
        address: string;
        name: string;
        email: string;
        telephone: string;
    }

}