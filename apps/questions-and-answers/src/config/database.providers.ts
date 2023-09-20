import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Answers } from '../Models/Answers.entity';
import { Categorys } from '../Models/Categorys.entity';
import { ChildAnswers } from '../Models/ChildAnswers.entity';
import { Questions } from '../Models/Questions.entity';
import { Stars } from '../Models/Stars.entity';

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
      sequelize.addModels([Answers, Categorys, ChildAnswers, Questions, Stars]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
