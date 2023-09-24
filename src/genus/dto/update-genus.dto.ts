import { PartialType } from '@nestjs/mapped-types';
import { CreateGenusDto } from './create-genus.dto';

export class UpdateGenusDto extends PartialType(CreateGenusDto) {}
