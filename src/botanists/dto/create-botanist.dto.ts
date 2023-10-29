import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBotanistDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail({}, { message: 'Invalid email format', groups: ['optional'] })
    @IsOptional()    
    email: string;

    @IsNotEmpty()
    institution: string;
}
