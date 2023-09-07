import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Cookies } from '../Models/Cookies.entity';
import { MetaData } from '../Models/MetaData.entity';
import { OldTokens } from '../Models/OldTokens.entity';
import { Profile } from '../Models/Profiles.entity';
import { Roles } from '../Models/Roles.entity';
import { Tokens } from '../Models/Tokens.entity';
import { Users } from '../Models/Users.entity';
import { Configs } from '../Models/Configs.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('DB'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT_AUTH'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_DATABASE'),
      });
      sequelize.addModels([Cookies, MetaData, OldTokens, Profile, Roles, Tokens, Users, Configs]);
      await sequelize.sync();
      LoadDB.check = true;
      return sequelize;
    },
  },
];

export class LoadDB {
  static check: boolean = false;
}
