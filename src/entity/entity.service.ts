import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class EntityService {

    constructor(
        @InjectRepository(UserEntity)
        public readonly userRepo: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        public readonly productRepo: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        public readonly categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(CartEntity)
        public readonly cartRepo: Repository<CartEntity>
    ) {}
}
