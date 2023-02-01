import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFilmDto } from '@/user/dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity, ActorsEntity } from '@common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    @InjectRepository(ActorsEntity)
    private actorsRepository: Repository<ActorsEntity>
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const filmExistsByTitle = await this.filmRepository.findOneBy({
      title: createFilmDto.title,
    });
    if (!!filmExistsByTitle) {
      throw new BadRequestException('Film already exists with this title.');
    }

    const newData = {
      title: createFilmDto.title,
      director: createFilmDto.director,
      releaseYear: createFilmDto.releaseYear,
    };
    const film = this.filmRepository.create(newData);
    const filmData = await this.filmRepository.save(film);
    for (const actor of createFilmDto.actors) {
      const actorEntity = this.actorsRepository.create({
        name: actor,
        film: filmData,
      });
      await this.actorsRepository.save(actorEntity);
    }
    return filmData;
  }

  // async findOneBy(options: any) {
  //   return this.filmRepository.findOne(options);
  // }
}
