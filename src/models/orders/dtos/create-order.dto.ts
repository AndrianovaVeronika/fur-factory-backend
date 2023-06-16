import {IsArray, IsNumber, IsOptional} from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    @IsNumber()
    userId: number;

    @IsArray()
    productsIds: number[]
}