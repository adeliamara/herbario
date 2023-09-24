import { IsNotEmpty } from "class-validator";

export class CreateLocationDto {
    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;
}
