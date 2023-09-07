import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Profile } from '../Models/Profiles.entity';

export class ProfileRepository extends BaseRepository<Profile> {
  constructor() {
    super(Profile);
  }
}
