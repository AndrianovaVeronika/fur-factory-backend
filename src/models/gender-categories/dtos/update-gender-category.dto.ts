import {IsString, MinLength} from "class-validator";

export class UpdateGenderCategoryDto {
    @IsString()
    @MinLength(3)
    name: string;
}