import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put, Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { FilmEntity } from '@app/common';
import { UpdateFilmDto } from './dto/update-film.dto';
import { JwtAuthGuard } from '@app/common';
import { GetAllFilmDto } from './dto/get-all-film.dto';

@ApiTags('Film')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @ApiOperation({ summary: 'To add a new film.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createFilmDto: CreateFilmDto): Promise<FilmEntity> {
    return this.filmService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'To list all the films.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetAllFilmDto): Promise<FilmEntity[]> {
    return await this.filmService.findAll(query);
  }

  @ApiOperation({ summary: 'To get the film by id.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FilmEntity> {
    return await this.filmService.findOne(id);
  }

  @ApiOperation({ summary: 'To update the film.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFilmDto: UpdateFilmDto
  ): Promise<FilmEntity> {
    return await this.filmService.update(id, updateFilmDto);
  }

  @ApiOperation({ summary: 'To remove the film' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return await this.filmService.remove(id);
  }
}
