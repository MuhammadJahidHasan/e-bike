import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/entity/entities/enum/userRole.enum";


export class SignupDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String, description: 'username'})
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type:String, description: 'email'})
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    @ApiProperty({type:String, description: 'phoneNumber'})
    readonly phoneNumber: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String, description: 'password'})
    readonly password: string;

    readonly roles: Role[];

}