import { IsNotEmpty } from "class-validator";

export class CreateUserRoleDto {
    @IsNotEmpty()
    roleId: number;
    
    @IsNotEmpty()
    userId: number;
}
