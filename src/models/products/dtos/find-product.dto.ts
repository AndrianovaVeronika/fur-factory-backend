import {IsArray, IsString} from "class-validator";

export class FindProductDto {
    @IsString()
    name: string;

    @IsArray()
    priceRange: [number, number];
}