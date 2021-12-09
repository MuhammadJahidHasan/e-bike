import { IsNotEmpty, IsNumber } from "class-validator";
import { ProductEntity } from "src/entity/entities/product.entity";
import { UserEntity } from "src/entity/entities/user.entity";



export class CreateCartDto {

    @IsNumber()
    @IsNotEmpty()
    productId: ProductEntity;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}