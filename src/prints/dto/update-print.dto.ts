import { PartialType } from '@nestjs/swagger';
import { CreatePrintDto } from './create-print.dto';

export class UpdatePrintDto extends PartialType(CreatePrintDto) {}
