import { compareHash, generateHash } from '@/common/crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User as UserEntity } from '@/common/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExistsByEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (!!userExistsByEmail) {
      throw new BadRequestException('Email Already Exists.');
    }

    const user = this.usersRepository.create(createUserDto);
    user.password = await generateHash(createUserDto.password);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUser(query: object) {
    const user = await this.usersRepository.findOneBy(query);
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async findUserById(userId: number) {
    const id = typeof userId === 'string' ? parseFloat(userId) : userId;
    const user = this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async updateUser(userId: string, updateUserData: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: parseFloat(userId) },
    });
    if (!user) throw new NotFoundException('User Not Found');

    Object.entries(updateUserData).forEach(([key, value]) => {
      if (key === 'context') return;
      if (!value) return;
      user[key] = value;
    });

    await this.usersRepository.update({ id: parseFloat(userId) }, user);
    return user;
  }

  async validateUser(payload: { email: string; password: string }) {
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'contact',
        'password',
        'dateOfBirth',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      where: { email: payload.email },
    });

    if (!user) throw new BadRequestException('Invalid Credentials');
    if (!(await compareHash(payload.password, user.password)))
      throw new BadRequestException('Invalid Credentials');

    return user;
  }
}
