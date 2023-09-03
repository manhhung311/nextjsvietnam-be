import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Roles } from '../Models/Roles.entity';

export class RolesRepository extends BaseRepository<Roles> {
  constructor() {
    super(Roles);
  }
}
