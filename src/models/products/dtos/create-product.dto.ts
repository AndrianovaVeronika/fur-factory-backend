import {IsNumber, IsOptional, IsString, MinLength} from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    productTypeId: number;

    @IsNumber()
    genderCategoryId: number;

    @IsNumber()
    furTypeId: number;

    @IsOptional()
    @IsString()
    imageName: string;
}