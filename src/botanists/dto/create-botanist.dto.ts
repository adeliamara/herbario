import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateBotanistDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    institution: string;
}
