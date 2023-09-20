import { Module } from '@nestjs/common';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { AuthenticationModule } from '../auth/authentication.module';
import { QAModule } from '../QA/QA.module';

@Module({
  imports: [AuthenticationModule, QAModule],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
