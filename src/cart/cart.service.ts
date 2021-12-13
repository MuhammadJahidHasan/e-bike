import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CartEntity } from 'src/entity/entities/cart.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { UserEntity } from 'src/entity/entities/user.entity';
import { EntityService } from 'src/entity/entity.service';
import { CreateCartDto } from './dto/createCart.dto';

@Injectable()
export class CartService {

    constructor(private entityService: EntityService) {}

    async addToCart(@Req() req, createCartDto: CreateCartDto): Promise<CartEntity> {

         const product = await this.entityService.productRepo.findOne({where:{id: createCartDto.productId}})
        if(!product) {
             throw new NotFoundException('Product Id was not found');
        }    
         const userId = req.user.userId;

         const cart = await this.entityService.cartRepo.find(userId);
         if(cart.length > 0) {
             const pro = await this.entityService.cartRepo.findOne({where:{product: createCartDto.productId}});
            //  .createQueryBuilder('cart')
            //  .where('cart.productId = :productId',{productId: createCartDto.productId})
            //  .getOne();
            console.log(pro);
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