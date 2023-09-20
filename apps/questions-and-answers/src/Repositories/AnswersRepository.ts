import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Answers } from '../Models/Answers.entity';

export class AnswersRepository extends BaseRepository<Answers> {
  constructor() {
    super(Answers);
  }
}
