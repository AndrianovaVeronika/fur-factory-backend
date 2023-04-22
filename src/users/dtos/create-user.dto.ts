import {IsEmail, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    telephone: string;
}