import { Module } from '@nestjs/common';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { AuthenticationModule } from '../auth/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
