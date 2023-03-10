import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasicStrategy } from './strategies/basic.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
