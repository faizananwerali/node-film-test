import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsDefined, IsOptional, Length } from 'class-validator';

@Exclude()
export class CreateFilmDto {
  @Expose()
  @IsString()
  @Length(3, 120)
  @ApiProperty({ required: true, example: faker.name.firstName() })
  title: string;

  @Expose()
  @IsString()
  @Length(3, 120)
  @ApiProperty({ required: true, example: faker.name.firstName() })
  director: string;

  @ApiProperty({
    required: true,
    example: faker.date.past(),
  })
  @Expose()
  @IsString()
  @IsDefined()
  releaseYear: Date;

  @ApiProperty({
    required: false,
    example: [
      faker.name.firstName(),
      faker.name.firstName(),
      faker.name.firstName(),
    ],
  })
  @Expose()
  @IsDefined()
  actors: string[];
}
