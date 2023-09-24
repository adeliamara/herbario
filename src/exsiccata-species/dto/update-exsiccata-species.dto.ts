import { PartialType } from '@nestjs/mapped-types';
import { CreateExsiccataSpeciesDto } from './create-exsiccata-species.dto';

export class UpdateExsiccataSpeciesDto extends PartialType(CreateExsiccataSpeciesDto) {}
