import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity, ActorsEntity } from '@app/common';
import { Like, Repository } from 'typeorm';
import { UpdateFilmDto } from './dto/update-film.dto';
import { GetAllFilmDto } from './dto/get-all-film.dto';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class FilmService {
  private _logger = new Logger(FilmService.name);
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    @InjectRepository(ActorsEntity)
    private actorsRepository: Repository<ActorsEntity>
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<FilmEntity> {
    try {
      this._logger.log({
        method: this.create.name,
        service: FilmService.name,
        body: createFilmDto,
      });
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
    } catch (error) {
      this._logger.error({
        method: this.create.name,
        service: FilmService.name,
        error,
      });
      throw error;
    }
  }

  async findAll(query: GetAllFilmDto): Promise<FilmEntity[]> {
    try {
      this._logger.log({
        method: this.findAll.name,
        service: FilmService.name,
        query,
      });

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
    } catch (error) {
      this._logger.error({
        method: this.findAll.name,
        service: FilmService.name,
        query,
      });
      throw error;
    }
  }

  async findOne(id: number): Promise<FilmEntity> {
    try {
      this._logger.log({
        method: this.findOne.name,
        service: FilmService.name,
        id,
      });

      const film = await this.filmRepository.findOne({
        relations: ['actors'],
        where: { id },
      });
      if (!film) throw new NotFoundException('Film Not Found.');
      return film;
    } catch (error) {
      this._logger.error({
        method: this.findOne.name,
        service: FilmService.name,
        error,
      });
      throw error;
    }
  }

  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<FilmEntity> {
    try {
      this._logger.log({
        method: this.update.name,
        service: FilmService.name,
        id,
        body: updateFilmDto,
      });

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
    } catch (error) {
      this._logger.error({
        method: this.update.name,
        service: FilmService.name,
        error,
      });
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    try {
      this._logger.log({
        method: this.remove.name,
        service: FilmService.name,
        id,
      });

      const film = await this.filmRepository.findOneBy({ id });
      if (!film) throw new NotFoundException('Film Not Found.');

      await this.actorsRepository
        .createQueryBuilder()
        .delete()
        .from(ActorsEntity)
        .where('filmId = :filmId', { filmId: film.id })
        .execute();

      await this.filmRepository.remove(film);
    } catch (error) {
      this._logger.error({
        method: this.remove.name,
        service: FilmService.name,
        error,
      });
      throw error;
    }
  }
}
