import { UserEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsEmailAlreadyExists', async: true })
@Injectable()
export class IsEmailAlreadyExists implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>
  ) {}

  async validate(email: string, args: ValidationArguments) {
    return !(await this.usersRepository.findOne({ where: { email } }));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email Address Already Exists.';
  }
}
