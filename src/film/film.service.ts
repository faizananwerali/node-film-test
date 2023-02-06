import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmDto } from '@/film/dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity, ActorsEntity } from '@common/entities';
import { Like, Repository } from 'typeorm';
import { UpdateFilmDto } from '@/film/dto/update-film.dto';
import { GetAllFilmDto } from '@/film/dto/get-all-film.dto';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    @InjectRepository(ActorsEntity)
    private actorsRepository: Repository<ActorsEntity>
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<FilmEntity> {
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
    const filmEntity = this.filmRepository.create(newData);
    const film = await this.filmRepository.save(filmEntity);
    const actorsList = [];
    for (const actor of createFilmDto.actors) {
      actorsList.push({
        name: actor,
        film: film,
      });
    }
    const actorsEntity = this.actorsRepository.create(actorsList);
    await this.actorsRepository.save(actorsEntity);
    return await this.filmRepository.findOne({
      relations: ['actors'],
      where: { id: film.id },
    });
  }

  async findAll(query: GetAllFilmDto): Promise<FilmEntity[]> {
    const { search, limit, page } = query;
    const option: FindManyOptions = {
      relations: ['actors'],
    };
    if (search) {
      option.where = {
        title: Like(`%${search}%`),
      };
    }
    if (limit) {
      option.take = limit;
    }
    if (page) {
      option.skip = (page - 1) * limit;
    }
    return await this.filmRepository.find(option);
  }

  async findOne(id: number): Promise<FilmEntity> {
    const film = await this.filmRepository.findOne({
      relations: ['actors'],
      where: { id },
    });
    if (!film) throw new NotFoundException('Film Not Found.');
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<FilmEntity> {
    let film = await this.filmRepository.findOneBy({ id });
    if (!film) throw new NotFoundException('Film Not Found.');

    if (updateFilmDto.title) {
      film.title = updateFilmDto.title;
    }
    if (updateFilmDto.director) {
      film.director = updateFilmDto.director;
    }
    if (updateFilmDto.releaseYear) {
      film.releaseYear = updateFilmDto.releaseYear;
    }
    film = await this.filmRepository.save(film);

    if (updateFilmDto.actors) {
      await this.actorsRepository
        .createQueryBuilder()
        .delete()
        .from(ActorsEntity)
        .where('filmId = :filmId', { filmId: film.id })
        .execute();

      const actorsList = [];
      for (const actor of updateFilmDto.actors) {
        actorsList.push({
          name: actor,
          film: film,
        });
      }
      const actorsEntity = this.actorsRepository.create(actorsList);
      await this.actorsRepository.save(actorsEntity);
    }

    return await this.filmRepository.findOne({
      relations: ['actors'],
      where: { id: film.id },
    });
  }

  async remove(id: number): Promise<any> {
    const film = await this.filmRepository.findOneBy({ id });
    if (!film) throw new NotFoundException('Film Not Found.');

    await this.actorsRepository
      .createQueryBuilder()
      .delete()
      .from(ActorsEntity)
      .where('filmId = :filmId', { filmId: film.id })
      .execute();

    await this.filmRepository.remove(film);
  }
}
