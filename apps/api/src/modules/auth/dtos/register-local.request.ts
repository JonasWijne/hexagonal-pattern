import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class RegisterRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(191)
    username: string;

    @IsOptional()
    @MaxLength(191)
    firstName: string;

    @IsOptional()
    @MaxLength(191)
    lastName: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
