import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthenticationModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: Number.parseInt(process.env.AUTH_PORT),
      // tlsOptions: {
      //   ca: '',
      //   cert: '',
      //   key: '',
      //   requestCert: true,
      // },
    },
  });
  await app.listen();
}
bootstrap();
