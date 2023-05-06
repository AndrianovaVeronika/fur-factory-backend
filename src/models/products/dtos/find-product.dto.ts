import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";

export class FindProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsArray()
    @IsOptional()
    priceRange: [number, number];

    @IsNumber()
    @IsOptional()
    productTypeId: number;

    @IsNumber()
    @IsOptional()
    genderCategoryId: number;

    @IsNumber()
    @IsOptional()
    furTypeId: number;
}