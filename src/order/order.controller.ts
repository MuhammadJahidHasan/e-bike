import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OrderEntity } from 'src/entity/entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {


    constructor(private orderService: OrderService){}

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Req() req): Promise<OrderEntity> {

        try { 
            
           return this.orderService.createOrder(req);

        } catch(err) {
            return err;
        }

    }
}
