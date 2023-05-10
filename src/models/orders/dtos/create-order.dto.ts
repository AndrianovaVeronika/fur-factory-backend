import {IsArray, IsNumber} from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    userId: number;

    @IsArray()
    productsIds: number[]
}