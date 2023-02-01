import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsDefined,
  MinLength,
  IsOptional,
  IsEmail,
  Length,
  Matches,
  MaxLength,
  Validate,
} from 'class-validator';
import {
  CustomMatchPasswords,
  CustomPassword,
  IsEmailAlreadyExists,
} from '@common/validations';

const pass = faker.internet.password();

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @Length(3, 120)
  @IsOptional()
  @ApiProperty({ required: false, example: faker.name.firstName() })
  readonly firstName: string;

  @Expose()
  @IsString()
  @Length(3, 120)
  @IsOptional()
  @ApiProperty({ required: false, example: faker.name.lastName() })
  readonly lastName: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, example: faker.internet.email() })
  // @Validate(IsEmailAlreadyExists)
  readonly email: string;

  @Expose()
  @IsOptional({
    context: {
      propertyName: 'Contact Number',
    },
  })
  @IsString({
    context: {
      propertyName: 'Contact Number',
    },
  })
  @Transform(({ value }) => value?.toString())
  // @Matches(/^\+?\d{10,13}$/g, {
  //   context: {
  //     propertyName: 'Contact Number',
  //   },
  // })
  @ApiProperty({ example: faker.phone.number('1501#######'), required: false })
  readonly contact: string;

  /*@ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  password!: string;*/
  @Expose()
  @IsString()
  @IsDefined()
  @MinLength(8)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  @Validate(CustomPassword)
  @ApiProperty({ required: true, example: pass })
  readonly password: string;

  @Expose()
  @IsString()
  @IsDefined()
  @MinLength(8)
  @Validate(CustomMatchPasswords, ['password'])
  @ApiProperty({ required: true, example: pass })
  readonly passwordConfirmation: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  dateOfBirth!: Date;
}
