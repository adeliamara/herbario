import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBotanistDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    @IsEmail({}, { message: 'Invalid email format', groups: ['optional'] })
    @ApiProperty()
    @IsOptional()    
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    institution: string;
}
