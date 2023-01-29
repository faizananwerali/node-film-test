import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  // @Index({ unique: true })
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: true,
    default: null,
  })
  firstName: string;

  @Column({
    nullable: true,
    default: null,
  })
  lastName: string;

  @Index({ unique: true })
  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  // @Index({ unique: true })
  @Column({
    nullable: true,
    default: null,
  })
  contact: string;

  @Column({
    nullable: false,
    default: '',
    length: 255,
    select: false,
  })
  password: string;
}
