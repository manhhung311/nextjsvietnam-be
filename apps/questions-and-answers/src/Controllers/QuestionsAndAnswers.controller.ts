import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QuestionsService } from '../Services/QuestionsAndAnswers.service';
import { CreatedQuestionsDTO } from '@app/common/questions-and-answers/DTO/createQuestions.dto';
import { QueryQuestionsDTO } from '@app/common/questions-and-answers/DTO/queryQuestions.dto';

@Controller('QuestionsAndAnswers')
export class QuestionsAndAnswersController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @MessagePattern({ cmd: 'create.q' })
  async getOTP(data: CreatedQuestionsDTO, headers?) {
    return this.questionsService.createQuestion(data, headers?.authorization);
  }

  @Get()
  @MessagePattern({ cmd: 'get.q' })
  async getQuestions(data: QueryQuestionsDTO) {
    return this.questionsService.getQuestions(data);
  }
}
