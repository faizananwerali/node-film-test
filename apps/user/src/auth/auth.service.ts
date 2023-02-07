import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  // private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.sendToken({ id: user.id });
  }

  login(payload: { user: any }) {
    const { user } = payload;
    return this.sendToken({ id: user.id });
  }

  sendToken(data: { id: number }) {
    const { accessToken } = this.accessToken(data);
    return { state: 'LOGIN', access: accessToken };
  }

  IsAccessVerified(id: number) {
    return this.userService.findUserById(id);
  }

  accessToken(payload: { id: number }) {
    return {
      accessToken: this.jwtService.sign(
        { id: payload.id },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRE'),
        }
      ),
    };
  }
}
