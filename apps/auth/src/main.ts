import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: process.env.AUTH_PORT,
    },
  });
  await app.listen();
}
bootstrap();
