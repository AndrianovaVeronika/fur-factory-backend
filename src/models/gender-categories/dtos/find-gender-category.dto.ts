import {IsOptional, IsString} from "class-validator";

export class FindGenderCategoryDto {
    @IsOptional()
    @IsString()
    name: string;
}