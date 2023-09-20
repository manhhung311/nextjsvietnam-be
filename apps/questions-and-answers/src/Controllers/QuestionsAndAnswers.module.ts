import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@app/mail';
import { QuestionsService } from '../Services/QuestionsAndAnswers.service';
import { QuestionsAndAnswersController } from './QuestionsAndAnswers.controller';
import { CategorysController } from './Categorys.controller';
import { CategorysService } from '../Services/Categorys.service';

@Module({
  controllers: [QuestionsAndAnswersController, CategorysController],
  providers: [CategorysService, QuestionsService, JwtService, MailService],
})
export class QuestionsModule {}
