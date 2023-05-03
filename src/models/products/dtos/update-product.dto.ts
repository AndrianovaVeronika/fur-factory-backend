import {IsNumber, IsString} from "class-validator";

export class FindProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;
}