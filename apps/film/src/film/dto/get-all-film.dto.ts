import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@app/common';

@Exclude()
export class GetAllFilmDto extends PaginationDto {
  constructor() {
    super();
  }

  @ApiPropertyOptional({ type: String })
  @Expose()
  @IsOptional()
  @IsString()
  search: string;
}
