import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import {UserEntity} from './entities/user.entity';
import { EntityService } from './entity.service';

const entities = [UserEntity, ProductEntity, CategoryEntity]

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [TypeOrmModule.forFeature(entities), EntityService],
  providers: [EntityService]
})
export class EntityModule {}
