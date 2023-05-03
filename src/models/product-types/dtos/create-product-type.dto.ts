import {IsString, MinLength} from "class-validator";

export class CreateProductTypeDto {
    @IsString()
    @MinLength(3)
    name: string;
}