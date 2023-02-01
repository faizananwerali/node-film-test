import { MigrationInterface, QueryRunner } from 'typeorm';

export class filmActors1675275263420 implements MigrationInterface {
  name = 'filmActors1675275263420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "actors" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "filmId" bigint, CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "film" ("id" BIGSERIAL NOT NULL, "title" character varying, "director" character varying, "releaseYear" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "deleted_at" SET DEFAULT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "actors" ADD CONSTRAINT "FK_a2826195dc0ac7697021fd1d16e" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "actors" DROP CONSTRAINT "FK_a2826195dc0ac7697021fd1d16e"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "deleted_at" DROP DEFAULT`
    );
    await queryRunner.query(`DROP TABLE "film"`);
    await queryRunner.query(`DROP TABLE "actors"`);
  }
}
