import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
   
  const options = new DocumentBuilder()
        .setTitle('e_bike api')
        .setDescription('This is an e-commerce api')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);     

  await app.listen(3000);
  console.log(`Server running on ${ 3000 }`);
}

bootstrap();
