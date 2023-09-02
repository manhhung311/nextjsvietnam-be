import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './send-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private config: ConfigService) {}
  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const transport = nodemailer.createTransport({
        service: this.config.get('SERVER_MAIL'),
        auth: {
          user: this.config.get('USER_MAIL'),
          pass: this.config.get('PASS_MAIL'),
        },
      });
      const mailOptions = {
        from: this.config.get('USER_MAIL'),
        to: sendEmailDto.user.email,
        subject: sendEmailDto.subject,
        html: await ejs.renderFile(
          join(`${process.cwd()}/libs/mail/src/templates/${sendEmailDto.template}.ejs`),
          sendEmailDto.context
        ),
      };
      return await transport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
}
