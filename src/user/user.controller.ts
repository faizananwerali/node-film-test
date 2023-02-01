import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@common/decorators';
import { JwtAuthGuard } from '@common/guards';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get('get-me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user) {
    return user;
  }

  @ApiOperation({ summary: 'To update user.' })
  @ApiBearerAuth()
  @Patch('update-user')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() body: UpdateUserDto, @User() user) {
    return await this.userService.updateUser(user.id, body);
  }
}
