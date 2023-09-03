import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Configs } from '../Models/Configs.entity';
import { TCONFIG } from '@app/common/Types/TConfig';

export class ConfigsRepository extends BaseRepository<Configs> {
  constructor() {
    super(Configs);
  }

  public async isPrivateSeccressKey() {
    return await Configs.findOne({
      where: {
        type: TCONFIG.PRIVATE_SECCRESS_KEY,
      },
    });
  }
}
