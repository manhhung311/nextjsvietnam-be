import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsAndAnswersController } from './questions-and-answers.controller';
import { QuestionsAndAnswersService } from './questions-and-answers.service';

describe('QuestionsAndAnswersController', () => {
  let questionsAndAnswersController: QuestionsAndAnswersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsAndAnswersController],
      providers: [QuestionsAndAnswersService],
    }).compile();

    questionsAndAnswersController = app.get<QuestionsAndAnswersController>(QuestionsAndAnswersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(questionsAndAnswersController.getHello()).toBe('Hello World!');
    });
  });
});
