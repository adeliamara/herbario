import { IsNotEmpty } from "class-validator";

export class CreateCollectorDto {
    @IsNotEmpty()
    name: string;
}
