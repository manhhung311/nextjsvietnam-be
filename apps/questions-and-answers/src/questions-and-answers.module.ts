import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './Controllers/QuestionsAndAnswers.module';

@Module({
  imports: [
    QuestionsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class QuestionsAndAnswersModule {}
