import { IsNotEmpty } from "class-validator";

export class CreateFamilyDto {
  @IsNotEmpty()
  name: string;
}

