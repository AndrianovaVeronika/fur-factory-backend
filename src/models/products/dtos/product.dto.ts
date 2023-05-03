import {Expose} from "class-transformer";

export class ProductDto {
    @Expose()
    productId: number;

    @Expose()
    name: string;

    @Expose()
    price: number;
}