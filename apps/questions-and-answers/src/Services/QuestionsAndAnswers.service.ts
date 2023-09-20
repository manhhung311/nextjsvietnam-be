import { HttpStatus, Injectable } from '@nestjs/common';
import { QuestionsRepository } from '../Repositories/QuestionsRepository';
import { Questions } from '../Models/Questions.entity';
import { CreatedQuestionsDTO } from '@app/common/questions-and-answers/DTO/createQuestions.dto';
import { QueryQuestionsDTO } from '@app/common/questions-and-answers/DTO/queryQuestions.dto';
import { CategorysRepository } from '../Repositories/CategorysRepository';
@Injectable()
export class QuestionsService {
  private questionsRepository: QuestionsRepository;
  private categoryRepository: CategorysRepository;
  constructor() {
    this.questionsRepository = new QuestionsRepository();
    this.categoryRepository = new CategorysRepository();
  }

  public async createQuestion(data: CreatedQuestionsDTO, token?: string) {
    console.log(data);
    const category = await this.categoryRepository.findById(data.category);
    if (!category)
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'not found category',
        data: null,
        errors: null,
      };
    const questions = new Questions();
    questions.data = data.data;
    questions.categoryId = data.category;
    let id, name;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      id = payload.id;
      name = payload.name;
    } catch (ex) {}
    if (id) {
      questions.userId = id;
    } else {
      questions.userId = `${Math.floor(Math.random() * 100000) + 1}`;
    }
    questions.name = name || `persion ${questions.userId}`;
    const question = await this.questionsRepository.save(questions);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: question,
      errors: null,
    };
  }

  public async getQuestions(query: QueryQuestionsDTO) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.questionsRepository.getQuetions({
        limit: query.limit,
        offset: query.offset,
        star: query.star || null,
        category: query.category || null,
        name: query.name,
      }),
      errors: null,
    };
  }
}
