import {IsString} from "class-validator";

export class AddProductTypeDto {
    @IsString()
    name: string;
}