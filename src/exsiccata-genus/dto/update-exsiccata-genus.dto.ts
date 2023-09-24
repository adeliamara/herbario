import { PartialType } from '@nestjs/mapped-types';
import { CreateExsiccataGenusDto } from './create-exsiccata-genus.dto';

export class UpdateExsiccataGenusDto extends PartialType(CreateExsiccataGenusDto) {}
