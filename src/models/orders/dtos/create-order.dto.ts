import {IsNumber} from "class-validator";
import {Product} from "../../products/product.entity";

export class CreateOrderDto {
    @IsNumber()
    userId: number;

    products: Product[]
}