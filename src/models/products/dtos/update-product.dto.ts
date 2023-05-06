import {IsNumber, IsOptional, IsString, MinLength} from "class-validator";

export class UpdateProductDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

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