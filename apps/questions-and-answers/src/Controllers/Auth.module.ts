import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../Services/authentication.service';
import { MailService } from '@app/mail';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService, MailService],
})
export class AuthModule {}
