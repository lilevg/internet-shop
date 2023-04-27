import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertIntoRole1682596692435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles" (value, description) VALUES ('user', 'user'), ('admin', 'admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "roles" where "value" = "user" or "value" = "admin"`,
    );
  }
}
