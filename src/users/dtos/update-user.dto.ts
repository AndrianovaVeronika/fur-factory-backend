import {IsEmail, IsString, IsOptional} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    telephone: string;
}