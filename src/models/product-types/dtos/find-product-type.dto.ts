import {IsString} from "class-validator";

export class FindProductTypeDto {
    @IsString()
    name: string;
}