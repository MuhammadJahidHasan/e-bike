import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartEntity } from './entities/cart.entity';
import { CategoryEntity } from './entities/category.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/orderItem.entity';
import { ProductEntity } from './entities/product.entity';
import {UserEntity} from './entities/user.entity';
import { EntityService } from './entity.service';

const entities = [UserEntity, ProductEntity, CategoryEntity, CartEntity, OrderEntity, OrderItemEntity]

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [TypeOrmModule.forFeature(entities), EntityService],
  providers: [EntityService]
})
export class EntityModule {}
