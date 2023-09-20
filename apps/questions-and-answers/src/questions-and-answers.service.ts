import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsAndAnswersService {
  getHello(): string {
    return 'Hello World!';
  }
}
