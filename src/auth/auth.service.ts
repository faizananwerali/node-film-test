import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  // private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(payload: { user: any }) {
    const { user } = payload;
    return this.sendToken({ id: user.id });
  }

  async sendToken(data: { id: string }) {
    const { accessToken } = await this.accessToken(data);
    return { state: 'LOGIN', access: accessToken };
  }

  IsAccessVerified(payload) {
    return true;
  }

  async accessToken(payload: { id: string }) {
    return {
      accessToken: this.jwtService.sign(
        { id: payload.id },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRE'),
        },
      ),
    };
  }
}
