import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
