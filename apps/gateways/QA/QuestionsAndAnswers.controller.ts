import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedQuestionsDTO } from '@app/common/questions-and-answers/DTO/createQuestions.dto';
import { QueryQuestionsDTO } from '@app/common/questions-and-answers/DTO/queryQuestions.dto';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@app/common/IResponse';
import { QuestionResponse } from '@app/common/questions-and-answers/Responses/question-response';
import { QuestionCreateResponse } from '@app/common/questions-and-answers/Responses/question-create-response';

@Controller('QuestionsAndAnswers')
export class QuestionsAndAnswersController {
  constructor(@Inject('QA') private readonly qaClient: ClientProxy) {}

  @Post()
  async create(@Body() data: CreatedQuestionsDTO): Promise<QuestionCreateResponse> {
    const request = this.qaClient.send({ cmd: 'create.q' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.CREATED) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Get()
  async getQuestions(@Query() data?: QueryQuestionsDTO): Promise<QuestionResponse> {
    const request = this.qaClient.send({ cmd: 'get.q' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }
}
