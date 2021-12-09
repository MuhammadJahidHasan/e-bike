import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CartEntity } from 'src/entity/entities/cart.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';

@Controller('cart')
export class CartController {

    
    constructor(private cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post()
    async addToCart(@Req() req, @Body() createCartDto: CreateCartDto): Promise<CartEntity> {
        
        try {
            return await this.cartService.addToCart(req, createCartDto);
        } catch(err) {
            return err;
        }
        
    }


    getCart() {}

}
