import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateSpeciesDto {   
    @IsNotEmpty()
    @IsString()
    name: string;
}
