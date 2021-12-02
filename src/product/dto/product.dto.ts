import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoryEntity } from "src/entity/entities/category.entity";


export class ProductDto {

     id: number;
     @IsString()
     @IsNotEmpty()
     title: string;

     @IsString()
     description: string;

     @IsInt()
     @Type(() => Number)
     @IsNotEmpty()
     price: number;

     @IsString()
     @IsNotEmpty()
     brand: string;

     
     productImage: string;

     @IsInt()
     @Type(() => Number)
     @IsNotEmpty()
     category: CategoryEntity;

}