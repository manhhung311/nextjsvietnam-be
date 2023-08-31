import { Controller, Get } from '@nestjs/common';
import { GatewaysService } from './gateways.service';

@Controller()
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Get()
  getHello(): string {
    return this.gatewaysService.getHello();
  }
}
