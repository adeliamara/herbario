import { Exclude, Type } from "class-transformer";
import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword, isStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    @Exclude({ toPlainOnly: true }) 
    password: string;


    @IsEmpty()
    removed: boolean;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    emailVerifiedAt: Date;

    @IsEmpty()
    rememberToken: string;
  }