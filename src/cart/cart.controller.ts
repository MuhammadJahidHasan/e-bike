import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CartEntity } from 'src/entity/entities/cart.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';

@ApiTags('Cart')
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

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get()
    async getCart(@Req() req): Promise<CartEntity[]> {

         console.log("akjg");
        try{
              return await this.cartService.getCart(req);
        } catch(err) {
            return err;
        }


    }

}
