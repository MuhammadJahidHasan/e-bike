import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/entity/entities/enum/userRole.enum";


export class SignupDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    readonly phoneNumber: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    readonly roles: Role[];

}