import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
