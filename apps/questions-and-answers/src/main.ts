import { NestFactory } from '@nestjs/core';
import { QuestionsAndAnswersModule } from './questions-and-answers.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(QuestionsAndAnswersModule);
  // await app.listen(4000);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(QuestionsAndAnswersModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: Number.parseInt(process.env.QA_PORT),
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
