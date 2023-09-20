import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuestionsAndAnswersController } from './QuestionsAndAnswers.controller';
import { CategorysController } from './Categorys.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QA',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [QuestionsAndAnswersController, CategorysController],
  providers: [],
})
export class QAModule {}
