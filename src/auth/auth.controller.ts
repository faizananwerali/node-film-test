import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@common/decorators';
import { BasicAuthGuard } from '@common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @Get('login')
  async login(@User() user) {
    return this.authService.login({ user });
  }
}
