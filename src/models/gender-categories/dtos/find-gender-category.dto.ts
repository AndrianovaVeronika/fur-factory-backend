import {IsString} from "class-validator";

export class FindGenderCategoryDto {
    @IsString()
    name: string;
}