import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FilmEntity } from '@app/common';

@Entity({ name: 'actors' })
export class ActorsEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => FilmEntity, (film) => film.actors)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;
}
