import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../Services/authentication.service';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    authenticationController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('auth', () => {
    it('login', () => {
      expect(authenticationController.login({ username: 'manhhung311', password: 'ManhHung311' })).toContainEqual({
        statusCode: 200,
        message: 'login success',
        data: {
          user: {
            id: 1,
            email: 'vumanhhung311@gmail.com',
            token: expect.any(String),
          },
          token: expect.any(String),
        },
        errors: null,
      });
    });
  });
});
