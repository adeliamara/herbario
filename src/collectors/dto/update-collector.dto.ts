import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectorDto } from './create-collector.dto';

export class UpdateCollectorDto extends PartialType(CreateCollectorDto) {}
