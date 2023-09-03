import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Op } from 'sequelize';
import { Users } from '../Models/Users.entity';
import { Profile } from '../Models/Profiles.entity';
import { Roles } from '../Models/Roles.entity';
import { Tokens } from '../Models/Tokens.entity';

export class UserRepository extends BaseRepository<Users> {
  constructor() {
    super(Users);
  }
  public async login(username: string, password: string): Promise<Users> {
    const user = await Users.findOne({
      where: {
        username: username,
        password: password,
      },
      include: [Profile],
    });
    user.password = null;
    return Users.findOne({
      where: {
        username: username,
        password: password,
      },
      include: [Profile],
    });
  }

  public async create(username: string, password: string, email: string): Promise<Users> {
    return Users.create({
      userName: username,
      password: password,
      email: email,
    });
  }

  public async findByUserName(username: string) {
    return Users.findOne({
      where: {
        userName: username,
      },
      include: [Profile, Roles, Tokens],
    });
  }

  public findByEmail(email: string): Promise<Users> {
    return Users.findOne({
      where: {
        email: email,
      },
    });
  }

  public async findByUserNameOrEmail(username: string, email: string) {
    return Users.findOne({
      where: {
        [Op.or]: [{ userName: username }, { email: email }],
      },
    });
  }

  public async findByUserNameAndEmail(username: string, email: string) {
    return Users.findOne({
      where: {
        userName: username,
        email: email,
      },
    });
  }
}
