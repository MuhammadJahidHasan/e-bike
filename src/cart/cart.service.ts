import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { clearConfigCache } from 'prettier';
import { CartEntity } from 'src/entity/entities/cart.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { UserEntity } from 'src/entity/entities/user.entity';
import { EntityService } from 'src/entity/entity.service';
import { CreateCartDto } from './dto/createCart.dto';

@Injectable()
export class CartService {

    constructor(private entityService: EntityService) {}

    async addToCart(@Req() req, createCartDto: CreateCartDto): Promise<CartEntity> {

         const product = await this.entityService.productRepo
            .createQueryBuilder('product')
            .where('product.id = :id',{id: createCartDto.productId})
            .getOne();

        if(!product) {
             throw new NotFoundException('Product Id was not found');
        }    
         const userId = req.user.userId;

         const cart = await this.entityService.cartRepo.find(userId);
         //console.log(cart);
         if(cart.length > 0) {
             const pro = await this.entityService.cartRepo
             .createQueryBuilder('cart')
             .where('cart.productId = :productId',{productId: createCartDto.productId})
             .getOne();
             if(pro) {
                   console.log('Already added');
             } else {
                let newCart = this.addNewCart(product,createCartDto, req);

                const result = await this.entityService.cartRepo.save(newCart);
                return result;
             }
    
         } else {

            let newCart = this.addNewCart(product,createCartDto, req);

           const result = await this.entityService.cartRepo.save(newCart);
           return result;
         }
    }

    private  addNewCart(product:ProductEntity, createCartDto: CreateCartDto, @Req() req): CartEntity {

        let newCart = new CartEntity(); 
        newCart.price = product.price;
        newCart.quantity = createCartDto.quantity;
        newCart.totalPrice = (product.price) * (createCartDto.quantity);
        newCart.user = req.user.userId;
        newCart.product = createCartDto.productId;

        return  newCart;
           
    }


    getCart() {}

}
