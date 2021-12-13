
import {Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

export class GetProductDto {

   
    @IsOptional()
    @Min(1)
    @Max(10)
    @IsInt()
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    page: number = 1;

}