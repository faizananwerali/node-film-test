import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
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
import { CustomMatchPasswords, CustomPassword } from '@common/validations';

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
  @Matches(/^\+?\d{10,13}$/)
  @ApiProperty({ required: false, example: faker.phone.number('1501#######') })
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
  @ApiProperty({ example: faker.internet.password() })
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirmation: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  dateOfBirth!: Date;
}
