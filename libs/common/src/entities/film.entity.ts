import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { ActorsEntity } from '@app/common';

@Entity({ name: 'film' })
export class FilmEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: true,
    default: null,
  })
  title: string;

  @Column({
    nullable: true,
    default: null,
  })
  director: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'releaseYear',
    nullable: true,
  })
  public releaseYear?: Date;

  @OneToMany(() => ActorsEntity, (actor) => actor.film, {
    cascade: true,
  })
  actors: ActorsEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    nullable: false,
    readonly: true,
    default: () => 'NOW()',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null ? value : new Date(value),
      to: (value?: string | null) =>
        value === undefined || value === null ? value : new Date(value),
    },
  })
  //@Type(() => Date)
  public createdAt?: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: false,
    default: () => 'NOW()',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null ? value : new Date(value),
      to: (value?: string | null) =>
        value === undefined || value === null ? value : new Date(value),
    },
  })
  //@Type(() => Date)
  public updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
    nullable: true,
    default: () => 'NULL',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null ? value : new Date(value),
      to: (value?: string | null) =>
        value === undefined || value === null ? value : new Date(value),
    },
  })
  //@Type(() => Date)
  public deletedAt?: Date;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date();
  }
}
