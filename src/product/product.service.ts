import { Injectable, Req } from '@nestjs/common';
import { CategoryEntity } from 'src/entity/entities/category.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { EntityService } from 'src/entity/entity.service';
import { CategoryDto } from './dto/category.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(private entityService: EntityService) {}


    async addProduct(@Req() req, productDto: ProductDto): Promise<ProductEntity> {

          const product =  await this.entityService.productRepo.save(productDto);
          return product;

    }

    async getProduct() : Promise<ProductEntity[]> {
        return await this.entityService.productRepo.find();
    }

    async addCategory(@Req() req, categoryDto: CategoryDto): Promise<CategoryEntity> {
        const category = await this.entityService.categoryRepo.save(categoryDto);

        return category;
    }

    async getCategory() : Promise<CategoryEntity[]> {
        return await this.entityService.categoryRepo.find();
    }




}
