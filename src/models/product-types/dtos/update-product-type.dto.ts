import {IsString, MinLength} from "class-validator";

export class UpdateProductTypeDto {
    @IsString()
    @MinLength(3)
    name: string;
}