import {IsString} from "class-validator";

export class FindFurTypeDto {
    @IsString()
    name: string;
}