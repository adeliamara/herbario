import { IsNotEmpty } from "class-validator";

export class CreateGenusDto {
    @IsNotEmpty()
    name: string;
}
