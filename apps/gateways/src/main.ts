import { NestFactory } from '@nestjs/core';
import { GatewaysModule } from './gateways.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewaysModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('ecommerce api gateway')
    .setDescription('The ecommerce API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
