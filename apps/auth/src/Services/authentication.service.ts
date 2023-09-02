import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../Repositories/UserRepository';
import { TokenRepository } from '../Repositories/TokenRepository';
import { OldTokenRepository } from '../Repositories/OldTokenRepository';
import { Users } from '../Models/Users.entity';
import { Tokens } from '../Models/Tokens.entity';
import { OldTokens } from '../Models/OldTokens.entity';
import { authenticator } from 'otplib';
import * as QRcode from 'qrcode';
import { MailService } from '@app/mail';
import { IResponse } from '@app/common/IResponse';
import { OpenOTPReponse } from '@app/common/Auth/Responses/OpenOTP-response';
import { VerifyOTPResponse } from '@app/common/Auth/Responses/VerifyOTP-response';
import { UserLoginDTO } from '@app/common/Auth/DTO/UserLoginDTO';
import { LoginResponse } from '@app/common/auth/Responses/login-response';
import { IUser } from '@app/common/Auth/DTO/IUser.interface';
import { UserRegisterDTO } from '@app/common/Auth/DTO/UserRegisterDTO';
import { RegisterReponse } from '@app/common/auth/Responses/register-response';
import { ForgotPasswordDTO } from '@app/common/Auth/DTO/ForgotPasswordDTO';
import { ForgetPasswordResponse } from '@app/common/Auth/Responses/forgetPassword-response';
import { ResetPasswordDTO } from '@app/common/Auth/DTO/ResetPasswordDTO';
import { ResetPasswordResponse } from '@app/common/Auth/Responses/resetPassword-response';
import { ReactivatedReponse } from '@app/common/Auth/Responses/reactivated-response';
import { ActivatedDTO } from '@app/common/Auth/DTO/activated.dto';
import { ActivatedReponse } from '@app/common/Auth/Responses/activated-response';
import { ConfigsRepository } from '../Repositories/ConfigsRepository';
import { TCONFIG } from '@app/common/Types/TConfig';
import { Configs } from '../Models/Configs.entity';
import { LoadDB } from '../config/database.providers';
@Injectable()
export class AuthenticationService {
  private userRepository: UserRepository;
  private token: TokenRepository;
  private oldToken: OldTokenRepository;
  private configs: ConfigsRepository;
  private static privateKey: string = null;
  private static publicKey: string = null;
  constructor(private jwt: JwtService, private config: ConfigService, private mailerClient: MailService) {
    this.userRepository = new UserRepository();
    this.token = new TokenRepository();
    this.oldToken = new OldTokenRepository();
    this.configs = new ConfigsRepository();
    this.setSeccressKey();
  }

  private async setSeccressKey() {
    if (!AuthenticationService.privateKey) {
      if (LoadDB.check) {
        const privateSeccressKey = await this.configs.isPrivateSeccressKey();
        if (!privateSeccressKey) {
          this.generateKey();
          const configSeccress = new Configs();
          configSeccress.type = TCONFIG.PRIVATE_SECCRESS_KEY;
          configSeccress.value = JSON.stringify({
            privateKey: AuthenticationService.privateKey,
            publicKey: AuthenticationService.publicKey,
          });
          this.configs.save(configSeccress);
        } else {
          AuthenticationService.publicKey = JSON.parse(privateSeccressKey.value).publicKey;
          AuthenticationService.privateKey = JSON.parse(privateSeccressKey.value).privateKey;
        }
      } else {
        setTimeout(() => {
          this.setSeccressKey();
        }, 500);
      }
    }
  }

  private generateKey() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    AuthenticationService.privateKey = privateKey;
    AuthenticationService.publicKey = publicKey;
  }

  public getPublicKey(): IResponse {
    this.setSeccressKey();
    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: AuthenticationService.publicKey,
      errors: null,
    };
  }

  async generateOTP(token: string) {
    const username = (<any>await this.verifyToken(token)).username;
    const user = await this.userRepository.findByUserName(username);
    return authenticator.generate(user.key2FA);
  }

  async generateOTPSendByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('cannot find email');
    return this.mailerClient.sendEmail({
      user: { id: user.id, username: user.userName, email: user.email, token: { token: null } },
      subject: 'OTP',
      template: 'SEND-OTP',
      context: {
        message: '',
        otp: authenticator.generate(user.key2FA),
      },
    });
  }

  async open2FA(token: string): Promise<OpenOTPReponse> {
    const username = (<any>await this.verifyToken(token))?.username;
    if (!username)
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'UNAUTHORIZED',
        data: null,
        errors: null,
      };
    const secret = authenticator.generateSecret();
    const user = await this.userRepository.findByUserName(username);
    user.open2FA = true;
    user.key2FA = user.key2FA ? user.key2FA : secret;
    await this.userRepository.update(user);
    const otp = await authenticator.keyuri(username, 'ecommerce', user.key2FA);
    const qrcode = await QRcode.toDataURL(otp);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
      data: {
        image: qrcode,
        urlOTP: otp,
      },
      errors: null,
    };
  }

  async verifyOTP(token: string, otp: number): Promise<VerifyOTPResponse> {
    console.log(await this.verifyToken(token));
    const username = (<any>await this.verifyToken(token)).username;
    const user = await this.userRepository.findByUserName(username);
    const iuser: IUser = {
      id: user.id,
      username: user.userName,
      email: user.email,
      otp: user.open2FA,
    };
    console.log(authenticator.check(otp.toString(), user.key2FA));
    const check = authenticator.verify({ token: otp.toString(), secret: user.key2FA });
    console.log(check);
    if (check) {
      const refreshToken = await this.generateRefeshToken(iuser);
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'success',
        data: {
          user: {
            ...iuser,
            token: {
              accessToken: await this.generateAccessToken({ ...iuser, verifyOTP: true }),
              refreshToken: refreshToken,
            },
            profile: user.profile,
          },
        },
        errors: null,
      };
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'otp cannot verify',
      data: null,
      errors: {
        otp: {
          message: 'Invalid otp',
          path: 'verify',
        },
      },
    };
  }

  async login(user: UserLoginDTO): Promise<LoginResponse> {
    try {
      const u = await this.findByUserNameOrEmail(user.username, user.username);
      if (u) {
        const check =
          (await bcrypt.compare(user.password, u.password)) || authenticator.generate(u.key2FA) == u.password;
        delete u.password;
        const iuser: IUser = {
          id: u.id,
          username: u.userName,
          email: u.email,
          otp: u.open2FA,
        };
        if (check) {
          if (!u.open2FA) {
            const refreshToken = await this.generateRefeshToken(iuser);
            const token = {
              accessToken: await this.generateAccessToken(iuser),
              refreshToken: refreshToken,
            };
            if (u.activated) {
              await this.setToken(u.id, token.refreshToken);
              return {
                statusCode: HttpStatus.OK,
                message: 'login success',
                data: {
                  user: {
                    ...iuser,
                    token: token,
                    profile: u.profile,
                  },
                },
                errors: null,
              };
            } else {
              return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'account not activated',
                data: null,
                errors: null,
              };
            }
          } else {
            return {
              statusCode: HttpStatus.FORBIDDEN,
              message: 'account need otp authentication',
              data: {
                user: {
                  token: {
                    accessToken: await this.generateAccessToken({ ...iuser, verifyOTP: false }),
                  },
                  profile: u.profile,
                  ...iuser,
                },
              },
              errors: null,
            };
          }
        }
      }

      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'wrong login',
        data: null,
        errors: null,
      };
    } catch (ex) {
      console.log(ex);
      return {
        statusCode: 500,
        message: ex,
        data: null,
        errors: null,
      };
    }
  }
  //
  async register(user: UserRegisterDTO): Promise<RegisterReponse> {
    let u = await this.findByUserNameOrEmail(user.username, user.email);
    if (!u) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      u = new Users();
      u.email = user.email;
      (u.userName = user.username), (u.password = user.password);
      u.activated = false /** email = false */;
      const token = await this.generateKeyJWT({ idActivated: u.id });
      u.keyActivated = token;
      u.open2FA = false;
      u.key2FA = '';
      u = await this.userRepository.save(u);
      console.log(token);
      delete u.password;
      this.mailerClient.sendEmail({
        user: { id: u.id, username: u.userName, email: user.email, token: { token: token } },
        subject: 'Activated Account',
        template: 'activate-account',
        context: {
          link: `${this.config.get('HOST')}/auth/activated/${token}`,
          message: '',
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'create success',
        data: {
          user: {
            id: u.id,
            otp: u.open2FA,
            username: u.userName,
            email: u.email,
            token: null,
            profile: u.profile,
          },
        },
        errors: null,
      };
    }
    return {
      statusCode: HttpStatus.CONFLICT,
      message: 'Account already exists',
      data: null,
      errors: {
        user: u.userName == user.username ? 'username already exists' : 'email already exists',
      },
    };
  }

  async forgetPassword(forget: ForgotPasswordDTO): Promise<ForgetPasswordResponse> {
    const user = await this.findByUserNameAndEmail(forget.username, forget.email);
    if (user) {
      const token = await this.generateKeyJWT({ idForget: user.id });
      user.keyForgetPassword = token;
      this.userRepository.update(user);
      await this.mailerClient.sendEmail({
        user: { id: user.id, username: user.userName, email: user.email, token: { token: token } },
        subject: 'reset password',
        template: 'forget-password',
        context: {
          link: `${this.config.get('HOST_FONT')}/forget-password/${token}`,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
        data: { email: forget.email },
        errors: null,
      };
    }
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: "Can't find account",
      data: { email: forget.email },
      errors: null,
    };
  }

  async resetPassword(key: string, resetPass: ResetPasswordDTO): Promise<ResetPasswordResponse> {
    if (resetPass.newPassword == resetPass.confirmPassword) {
      const decode = await this.verifyToken(key);
      if (decode) {
        const idUser = (<any>decode).idForget;
        let user = await this.findById(idUser);
        if (user && user.keyForgetPassword === key) {
          user.keyForgetPassword = '';
          const salt = await bcrypt.genSalt();
          const password = await bcrypt.hash(resetPass.newPassword, salt);
          user.password = password;
          user = await this.updateUser(user);
          return {
            statusCode: HttpStatus.CREATED,
            message: 'success',
            data: null,
            errors: null,
          };
        }
      }
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'token không đúng',
        data: null,
        errors: null,
      };
    }
    return {
      statusCode: HttpStatus.PRECONDITION_FAILED,
      message: 'mật khẩu không đúng',
      data: null,
      errors: null,
    };
  }

  async logout(refreshToken: string): Promise<{ statusCode: number; message: string }> {
    if (refreshToken) {
      const token = await this.findToken(refreshToken);
      if (token) {
        this.deleteToken(token);
        return {
          statusCode: HttpStatus.ACCEPTED,
          message: 'success',
        };
      }
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '',
    };
  }

  async logoutAll(accessToken: string): Promise<{ statusCode: number; message: string }> {
    const token = await this.verifyToken(accessToken);
    if (token) {
      const username = (<any>token).username;
      const users = await this.findByUserName(username);
      users.token.forEach((element) => {
        this.deleteToken(element);
      });
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'success',
      };
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'success',
    };
  }

  async getToken(t: string) {
    const token = await this.findToken(t);
    if (token) {
      const decode = await this.verifyToken(t);
      if (decode) {
        const user = await this.findByUserName((<any>decode).username);
        const iuser: IUser = {
          id: user.id,
          username: user.userName,
          email: user.email,
          otp: user.open2FA,
        };
        return {
          statusCode: HttpStatus.OK,
          message: 'OK',
          data: {
            user: {
              ...iuser,
              token: {
                accessToken: await this.generateAccessToken(iuser),
                refreshToken: t,
              },
            },
          },
        };
      }
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Mã Token hết hạn',
      data: null,
    };
  }

  async reactivated(token: string): Promise<ReactivatedReponse> {
    const decode = this.verifyToken(token);
    const username = (<any>decode).username || null;
    if (username) {
      const user = await this.findByUserName(username);
      if (!user.activated) {
        const token_ = await this.generateKeyJWT({ idActivated: user.id });
        user.keyActivated = token_;
        this.userRepository.update(user);
        await this.mailerClient.sendEmail({
          user: { id: user.id, username: user.userName, email: user.email, token: { token: token_ } },
          subject: 'activate account',
          template: 'activated-account',
          context: {
            link: `${this.config.get('HOST_FONT')}/activated/${token_}`,
            message: '',
          },
        });
        return {
          statusCode: HttpStatus.CREATED,
          message: 'success',
          data: { email: user.email },
          errors: null,
        };
      }
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '',
      data: null,
      errors: null,
    };
  }

  public async findByUserNameOrEmail(username: string, email: string): Promise<Users> {
    return this.userRepository.findByUserNameOrEmail(username, email);
  }

  public async findByEmail(email: string): Promise<Users> {
    return this.userRepository.findByEmail(email);
  }

  public async findByUserName(username: string): Promise<Users> {
    return this.userRepository.findByUserName(username);
  }

  public async findById(id: number): Promise<Users> {
    return this.userRepository.findById(id);
  }

  async generateAccessToken(object: IUser): Promise<string> {
    return this.jwt.signAsync(object, {
      algorithm: 'RS256',
      expiresIn: '30m',
      secret: AuthenticationService.privateKey,
    });
  }

  async verifyToken(token: string): Promise<object> {
    try {
      return this.jwt.verify(token, {
        secret: AuthenticationService.publicKey,
      });
    } catch (ex) {
      return null;
    }
  }

  async generateRefeshToken(object: IUser): Promise<string> {
    return this.jwt.signAsync(object, {
      algorithm: 'RS256',
      expiresIn: '90d',
      secret: AuthenticationService.privateKey,
    });
  }

  async setToken(idUser: string, token: string) {
    const newToken = new Tokens();
    newToken.idUser = idUser;
    newToken.refreshToken = token;
    newToken.open = false;
    return await this.token.save(newToken);
  }

  async findToken(token: string) {
    const token_ = await this.token.findByToken(token);
    if (token_) return token_;
    else throw new UnauthorizedException('token không đúng');
  }

  public async deleteToken(token: Tokens) {
    const oldToken = new OldTokens();
    oldToken.idUser = token.idUser;
    oldToken.refreshToken = token.refreshToken;
    oldToken.idMetaData = token.idMetaData;
    this.oldToken.save(oldToken);
    token.destroy();
  }

  public async generateKeyJWT(obj: object, time: string = '15m') {
    return this.jwt.signAsync(obj, {
      algorithm: 'RS256',
      expiresIn: time,
      secret: AuthenticationService.privateKey,
    });
  }

  public async updateUser(user: Users): Promise<Users> {
    return this.userRepository.update(user);
  }

  public async findByUserNameAndEmail(username: string, email: string): Promise<Users> {
    return this.userRepository.findByUserNameAndEmail(username, email);
  }

  public async activated(key: ActivatedDTO): Promise<ActivatedReponse> {
    const decode = await this.verifyToken(key.token);
    if (decode) {
      const idUser = (<any>decode).idActivated || null;
      let user = await this.findById(idUser);
      if (user) {
        if (!user.activated) {
          if (user.keyActivated === key.token) {
            user.activated = !user.activated;
            user.keyActivated = '';
            user = await this.userRepository.update(user);
            if (user != null) {
              return {
                statusCode: HttpStatus.CREATED,
                message: 'activate success',
                data: null,
                errors: null,
              };
            }
          } else {
            return {
              statusCode: HttpStatus.UNAUTHORIZED,
              message: 'mã kích hoạt hết hạn',
              data: null,
              errors: null,
            };
          }
        } else {
          return {
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: 'Tài khoản này đã được kích hoạt',
            data: null,
            errors: null,
          };
        }
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Tài khoản không tồn tại',
          data: null,
          errors: null,
        };
      }
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'mã kích hoạt không đúng',
      data: null,
      errors: null,
    };
  }
}
