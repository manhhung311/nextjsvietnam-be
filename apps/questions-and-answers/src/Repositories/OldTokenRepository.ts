import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { OldTokens } from '../Models/OldTokens.entity';

export class OldTokenRepository extends BaseRepository<OldTokens> {
  constructor() {
    super(OldTokens);
  }

  public async findByToken(token: string): Promise<OldTokens> {
    return OldTokens.findOne({
      where: {
        refreshToken: token,
      },
    });
  }
}
