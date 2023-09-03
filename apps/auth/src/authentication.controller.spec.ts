import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './Services/authentication.service';
import { AuthenticationController } from './Controllers/authentication.controller';

describe('AuthenticationController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    authenticationController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(authenticationController.getHello()).toBe('Hello World!');
    });
  });
});
