import {IsEmail, IsString, IsOptional, MinLength, Matches} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @Matches(/[+]?[0-9]{10,12}/)
    @IsOptional()
    telephone: string;
}