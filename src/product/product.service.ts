import { Injectable, Req } from '@nestjs/common';
import { CategoryEntity } from 'src/entity/entities/category.entity';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { EntityService } from 'src/entity/entity.service';
import { Pagination } from 'src/paginate/pagination';
import { PaginationOptionsInterface } from 'src/paginate/pagination.options.interface';
import { CategoryDto } from './dto/category.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(private entityService: EntityService) {}


    async addProduct(@Req() req, productDto: ProductDto): Promise<ProductEntity> {

          const product =  await this.entityService.productRepo.save(productDto);
          return product;

    }

    async getProduct(options: PaginationOptionsInterface) : Promise<Pagination<ProductEntity>>{

        const [result, total] = await this.entityService.productRepo.findAndCount({
            take:options.limit,
            skip:(options.page-1) * (options.limit)
        });
        return new Pagination<ProductEntity>({
           result,
           total
        
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
