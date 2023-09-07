import { Module } from '@nestjs/common';
import { QuestionsAndAnswersController } from './questions-and-answers.controller';
import { QuestionsAndAnswersService } from './questions-and-answers.service';

@Module({
  imports: [],
  controllers: [QuestionsAndAnswersController],
  providers: [QuestionsAndAnswersService],
})
export class QuestionsAndAnswersModule {}
