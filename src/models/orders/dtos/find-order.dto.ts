import {IsArray, IsBoolean, IsNumber, IsOptional} from "class-validator";

export class FindOrderDto {
    @IsOptional()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsBoolean()
    shipped: boolean;

    @IsOptional()
    @IsArray()
    dateRange: [Date, Date];

    @IsOptional()
    @IsArray()
    priceRange: [number, number];
}