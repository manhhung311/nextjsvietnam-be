import { UserLoginDTO } from '@app/common/Auth/DTO/UserLoginDTO';
import { IResponse } from '@app/common/IResponse';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '@app/common/Auth/Responses/login-response';
import { ApiTags } from '@nestjs/swagger';
import { RegisterReponse } from '@app/common/Auth/Responses/register-response';
import { UserRegisterDTO } from '@app/common/Auth/DTO/UserRegisterDTO';
import { ActivatedDTO } from '@app/common/Auth/DTO/activated.dto';

@ApiTags('Authetication')
@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthenticationController {
  constructor(@Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy) {}

  @Post('login')
  async login(@Body() login: UserLoginDTO): Promise<LoginResponse> {
    const request = this.authenticationClient.send({ cmd: 'login' }, login);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('register')
  async register(@Body() register: UserRegisterDTO): Promise<RegisterReponse> {
    const request = this.authenticationClient.send({ cmd: 'register' }, register);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Get('publickey')
  async getPublicKey(): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'publickey' }, '');
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Get('getToken/:token')
  async getToken(@Param('token') token: string): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'getToken' }, token);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('open2fa')
  async open2FA(@Body() token: string): Promise<IResponse> {
    console.log('hello', token);
    const request = this.authenticationClient.send({ cmd: 'open2FA' }, token);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.CREATED) {
      throw new HttpException(
        {
          data: response.data,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('verifyOTP')
  async verifyOTP(@Body() data: { otp: number; token: number }): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'verifyOTP' }, data);
    const response: IResponse = await firstValueFrom(request);
    console.log(response);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('forgetPassword')
  async forgetPassword(@Body() data: { email: string }): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'forgetPassword' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('resetPassword')
  async resetPassword(@Body() data: { token: string; password: string }): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'resetPassword' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('activated')
  async activated(@Body() data: ActivatedDTO): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'activated' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Post('logoutAll')
  async logoutALll(@Body() data: { token: string }): Promise<IResponse> {
    const request = this.authenticationClient.send({ cmd: 'logoutAll' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: response.message,
        },
        response.statusCode
      );
    }
    return response;
  }
}
