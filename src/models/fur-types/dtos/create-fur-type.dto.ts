import {IsString, MinLength} from "class-validator";

export class CreateFurTypeDto {
    @IsString()
    @MinLength(3)
    name: string;
}