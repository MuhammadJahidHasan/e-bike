import { Injectable, InternalServerErrorException, NotAcceptableException, Req } from '@nestjs/common';
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
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          
          const cart =  await this.entityService.cartRepo.find({
            select:['quantity'], 
            relations:['product'],
            where: {
               user:userId
              }
        }) 

        if(cart.length > 0) {
         cart.forEach(async (cartItems, index) => {
                 orderItem = {
                    title: cartItems.product.title,
                    price: cartItems.product.price,
                    productImage: cartItems.product.productImage,
                    quantity: cartItems.quantity
               }
                subtotals+= cartItems.product.price*cartItems.quantity;
               orderItemList.push(orderItem);
            });

           
           const newOrder = {
               userMail: req.user.email,
               date: today.toDateString(),
               shippingAddress: 'Baridhara, Dhaka-1212',
               subTotal: subtotals,
               deliveryCharge:50,
               orderItem: orderItemList
           }
           const order = await this.entityService.orderRepo.save(newOrder);
           if(order) {
              const orderId =order.id
              orderItemList.forEach(async (item, index) => {
                 
                console.log(item.title);
                orderItem = {
                     title: item.title,
                     price: item.price,
                     productImage: item.productImage,
                     order: orderId,
                     quantity: item.quantity,
                }
                await this.entityService.orderItemRepo.save(orderItem);
              })
              await this.entityService.cartRepo.delete({user: userId});
               return order;
           } else {
                throw new InternalServerErrorException();
           }

        } else {
            throw new NotAcceptableException ('There is no cart available');
        }

    }

}
