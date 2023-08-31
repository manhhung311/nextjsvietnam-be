import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';

describe('GatewaysController', () => {
  let gatewaysController: GatewaysController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [GatewaysService],
    }).compile();

    gatewaysController = app.get<GatewaysController>(GatewaysController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewaysController.getHello()).toBe('Hello World!');
    });
  });
});
