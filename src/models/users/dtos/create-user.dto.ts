import {IsEmail, IsOptional, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @Matches(/[+]?[0-9]{10,12}/)
    @IsOptional()
    telephone: string;
}