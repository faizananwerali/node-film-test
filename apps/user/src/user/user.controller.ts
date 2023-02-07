import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@app/common';
import { UserEntity } from '@app/common';
import { JwtAuthGuard } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'To list all the users.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'To get the user by id.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findUserById(id);
  }

  @ApiOperation({ summary: 'To get the current user.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get-me')
  async getMe(@User() user): Promise<UserEntity> {
    return user;
  }

  @ApiOperation({ summary: 'To update the user.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update-user')
  async updateUser(
    @Body() body: UpdateUserDto,
    @User() user
  ): Promise<UserEntity> {
    return await this.userService.updateUser(user.id, body);
  }

  @MessagePattern('get_user')
  async getUser(id: number): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }
}
