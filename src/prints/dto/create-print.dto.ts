import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreatePrintDto {
    @IsNotEmpty()
    exsicataId: number;

    @IsEmpty()
    userId: number;
}
