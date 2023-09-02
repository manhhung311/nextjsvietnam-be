import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Tokens } from '../Models/Tokens.entity';
import { Users } from '../Models/Users.entity';

export class TokenRepository extends BaseRepository<Tokens> {
  constructor() {
    super(Tokens);
  }

  public async findByToken(token: string): Promise<Tokens> {
    return Tokens.findOne({
      where: {
        refreshToken: token,
      },
      include: [Users],
    });
  }
}
