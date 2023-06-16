import {IsOptional, IsString} from "class-validator";

export class FindProductTypeDto {
    @IsOptional()
    @IsString()
    name: string;
}