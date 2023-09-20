import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Stars } from '../Models/Stars.entity';

export class StarsRepository extends BaseRepository<Stars> {
  constructor() {
    super(Stars);
  }
}
