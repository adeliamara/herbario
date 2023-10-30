import { IsNotEmpty } from "class-validator";

export class CreateEnvironmentDto {
    @IsNotEmpty()
    name: string;
}
