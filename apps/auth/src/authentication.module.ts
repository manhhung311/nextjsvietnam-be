import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Controllers/Auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService],
  exports: [],
})
export class AuthenticationModule {}
