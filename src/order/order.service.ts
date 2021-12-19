import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { OrderEntity } from 'src/entity/entities/order.entity';
import { EntityService } from 'src/entity/entity.service';

@Injectable()
export class OrderService {

     
    constructor(private entityService: EntityService) {}


    async createOrder(@Req() req): Promise<OrderEntity> {
          const userId = req.user.userId;
          let subtotals = 0;
          let orderItemList = [];
          let orderItem = {};
          //console.log(userId);
          const cart =  await this.entityService.cartRepo.find({
            select:['quantity'], 
            relations:['product'],
            where: {
               user:userId
              }
        }) 

           const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
           const newOrder = {
               userMail: req.user.email,
               date: today.toDateString(),
               shippingAddress: 'Baridhara, Dhaka-1212',
               subTotal: subtotals,
               deliveryCharge:50,
               //orderItem: orderItemList
           }
           const order = await this.entityService.orderRepo.save(newOrder);
           //console.log(order);
           if(order) {

            // cart.forEach(async (cartItems, index) => {
            //     console.log(cartItems.quantity);  
            //      orderItem = {
            //         title: cartItems.product.title,
            //         price: cartItems.product.price,
            //         productImage: cartItems.product.productImage,
            //         quantity: cartItems.quantity
            //    }
            //     subtotals+= cartItems.product.price*cartItems.quantity;
            //    orderItemList.push(orderItem);
            // });
              
               //await this.entityService.cartRepo.delete({user:userId});
               return order;
           } else {
                throw new InternalServerErrorException()
           }

    }

}
