import { PartialType } from '@nestjs/mapped-types';
import { CreateExsiccataFamilyDto } from './create-exsiccata-family.dto';

export class UpdateExsiccataFamilyDto extends PartialType(CreateExsiccataFamilyDto) {}
