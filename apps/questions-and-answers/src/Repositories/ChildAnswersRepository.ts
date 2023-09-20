import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { ChildAnswers } from '../Models/ChildAnswers.entity';

export class AnswersRepository extends BaseRepository<ChildAnswers> {
  constructor() {
    super(ChildAnswers);
  }
}
