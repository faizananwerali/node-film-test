import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCreate1675245030522 implements MigrationInterface {
  name = 'userCreate1675245030522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL DEFAULT '', "contact" character varying, "password" character varying(255) NOT NULL DEFAULT '', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
