import {IsOptional, IsString} from "class-validator";

export class FindFurTypeDto {
    @IsOptional()
    @IsString()
    name: string;
}