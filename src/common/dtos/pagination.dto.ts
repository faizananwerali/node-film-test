import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class PaginationDto {
  @ApiPropertyOptional({ required: false, example: 10})
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 10))
  limit: number;

  @ApiPropertyOptional({ required: false, example: 1})
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 1))
  page: number;
}
