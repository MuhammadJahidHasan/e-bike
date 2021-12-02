import { IsNotEmpty, IsString } from "class-validator";


export class CategoryDto {
     
    id: number;
    
    @IsString()
    @IsNotEmpty()
     name: string;

}