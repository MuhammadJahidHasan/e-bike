import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntityModule } from './entity/entity.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
			useFactory: async () => ({
				type: 'mysql',
				host: '172.17.0.1',
				port: 3306,
				username:'root',
				password: 'root',
				database: 'e_bike',
				entities: ['dist/**/*.entity{.ts,.js}'],
				synchronize: true,
				extra: {
					connectionLimit: 10
				}
			})
		}),
	ServeStaticModule.forRoot({
		rootPath:'uploads'
	}),	
    EntityModule,
	AuthModule,
	ProductModule,
	CartModule,
	OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
