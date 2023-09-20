import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Categorys } from '../Models/Categorys.entity';

export class CategorysRepository extends BaseRepository<Categorys> {
  constructor() {
    super(Categorys);
  }
}
