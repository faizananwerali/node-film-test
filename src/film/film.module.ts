import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsEntity, FilmEntity } from '@common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ActorsEntity])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
