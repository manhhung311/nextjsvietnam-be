import { NestFactory } from '@nestjs/core';
import { QuestionsAndAnswersModule } from './questions-and-answers.module';

async function bootstrap() {
  const app = await NestFactory.create(QuestionsAndAnswersModule);
  await app.listen(3000);
}
bootstrap();
