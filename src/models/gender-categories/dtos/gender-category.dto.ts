import {Expose} from "class-transformer";

export class GenderCategoryDto {
    @Expose()
    genderCategoryId: number;

    @Expose()
    name: string;
}