import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';

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
