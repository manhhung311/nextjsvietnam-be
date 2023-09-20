import { Controller, Get } from '@nestjs/common';
import { QuestionsAndAnswersService } from './questions-and-answers.service';

@Controller()
export class QuestionsAndAnswersController {
  constructor(private readonly questionsAndAnswersService: QuestionsAndAnswersService) {}

  @Get()
  getHello(): string {
    return this.questionsAndAnswersService.getHello();
  }
}
