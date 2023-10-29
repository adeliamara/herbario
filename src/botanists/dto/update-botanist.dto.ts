import { PartialType } from '@nestjs/mapped-types';
import { CreateBotanistDto } from './create-botanist.dto';

export class UpdateBotanistDto extends PartialType(CreateBotanistDto) {}
