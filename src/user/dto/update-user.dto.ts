import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Validate,
  Length,
  Matches,
} from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
// import { IsEmailAlreadyExists } from '@common/validations';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @ApiProperty({ required: false, example: faker.name.firstName() })
  @IsString()
  @IsOptional()
  @Length(3, 120)
  firstName: string;

  @Expose()
  @ApiProperty({ required: false, example: faker.name.lastName() })
  @IsString()
  @Length(3, 120)
  @IsOptional()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsDefined({
    context: {
      propertyName: 'Email Address',
    },
  })
  @IsString({
    context: {
      propertyName: 'Email Address',
    },
  })
  @IsEmail(
    {},
    {
      context: {
        propertyName: 'Email Address',
        replaceAllPropertyName: false,
      },
    }
  )
  // @Validate(IsEmailAlreadyExists)
  @ApiProperty({ example: faker.internet.email() })
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
  @Matches(/^\+?\d{10,13}$/g, {
    context: {
      propertyName: 'Contact Number',
    },
  })
  @ApiProperty({ example: faker.phone.number('1501#######'), required: false })
  contact: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  dateOfBirth!: Date;
}
