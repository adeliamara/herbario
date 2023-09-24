import { PartialType } from '@nestjs/mapped-types';
import { CreateExsiccataDto } from './create-exsiccata.dto';

export class UpdateExsiccataDto extends PartialType(CreateExsiccataDto) {}
