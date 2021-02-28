import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudent1614279461498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(100)",
          },
          {
            name: "email",
            type: "varchar(100)",
          },
          {
            name: "CPF",
            type: "varchar(11)",
            isUnique: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students");
  }
}
