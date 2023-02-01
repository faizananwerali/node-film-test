import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilmService } from '@/film/film.service';
import { CreateFilmDto } from '@/user/dto/create-film.dto';

@ApiTags('Film')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}
  @Post('create')
  async register(@Body() createFilmDto: CreateFilmDto) {
    console.log('createFilmDto', createFilmDto);
    return this.filmService.create(createFilmDto);
  }
}
