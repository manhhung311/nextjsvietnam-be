import { NestFactory } from '@nestjs/core';
import { GatewaysModule } from './gateways.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewaysModule);
  await app.listen(3000);
}
bootstrap();
