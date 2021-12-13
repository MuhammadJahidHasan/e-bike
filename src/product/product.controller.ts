import { Body, Controller, Get, HttpCode, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CategoryEntity } from 'src/entity/entities/category.entity';
import { Role } from 'src/entity/entities/enum/userRole.enum';
import { ProductEntity } from 'src/entity/entities/product.entity';
import { Pagination } from 'src/paginate/pagination';
import { CategoryDto } from './dto/category.dto';
import { GetProductDto } from './dto/getProduct.dto';
import { ProductDto } from './dto/product.dto';
import { Helper } from './Helper/customFileName';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

      constructor(private productService: ProductService) {}

      @Roles(Role.Admin)
      @UseGuards(JwtAuthGuard)
      @Post()
      @HttpCode(200)
      @UseInterceptors(FileInterceptor('productImage', {
          storage: diskStorage({
              destination:'uploads/',
              filename: Helper.customFileName
          }),
          fileFilter: Helper.imageFileFilter
      }))
      async addProduct(@Req() req, @Body() productDto: ProductDto, @UploadedFile() file: Express.Multer.File): Promise<ProductEntity> {

            productDto.productImage = req.file.path;
            try {
                return await this.productService.addProduct(req, productDto);
            } catch(err) {

                return err;
            }
      }

      @HttpCode(200)
      @UseGuards(RolesGuard)
      @Roles(Role.Admin)
      @UseGuards(JwtAuthGuard)
      @Get()
      async getProduct(@Query() query: GetProductDto): Promise<Pagination<ProductEntity>> {
          
          try {
              return await this.productService.getProduct(query);
          } catch(err) {
              return err;
          }
      }

      @Post('category')
      @HttpCode(200)
      async addCategory(@Req() req, @Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
          try {
              return await this.productService.addCategory(req, categoryDto);
          } catch(err) {
              return err;
          }
      }
      @Get('category')
      @HttpCode(200)
      async getCategory() : Promise<CategoryEntity[]> {
          try {
              return await this.productService.getCategory();
          } catch(err) {
              return err;
          }
      }
}
