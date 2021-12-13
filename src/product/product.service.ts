import { Injectable, Req } from '@nestjs/common';
import { query } from 'express';
import { CategoryEntity } from 'src/entity/entities/category.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { EntityService } from 'src/entity/entity.service';
import { Pagination } from 'src/paginate/pagination';
import { CategoryDto } from './dto/category.dto';
import { GetProductDto } from './dto/getProduct.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(private entityService: EntityService) {}


    async addProduct(@Req() req, productDto: ProductDto): Promise<ProductEntity> {

          const product =  await this.entityService.productRepo.save(productDto);
          return product;

    }

    async getProduct(@Req() query: GetProductDto) : Promise<Pagination<ProductEntity>> {

         let limit  = query.limit;
         let page = query.page;
        const [result, total] = await this.entityService.productRepo.findAndCount({
            take:limit,
            skip:(page-1) * limit
        });
        return new Pagination<ProductEntity>({
           result,
           total,
           limit,
           page
        });
    }

    async addCategory(@Req() req, categoryDto: CategoryDto): Promise<CategoryEntity> {
        const category = await this.entityService.categoryRepo.save(categoryDto);

        return category;
    }

    async getCategory() : Promise<CategoryEntity[]> {
        return await this.entityService.categoryRepo.find();
    }

}
