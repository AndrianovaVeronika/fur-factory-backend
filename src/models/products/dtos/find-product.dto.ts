import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";

export class FindProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsArray()
    @IsNumber({}, {each: true})
    @IsOptional()
    priceRange: [number, number];

    @IsArray()
    @IsNumber({}, {each: true})
    @IsOptional()
    productTypeIds: number[];

    @IsArray()
    @IsNumber({}, {each: true})
    @IsOptional()
    genderCategoryIds: number[];

    @IsArray()
    @IsOptional()
    furTypeIds: number[];
}