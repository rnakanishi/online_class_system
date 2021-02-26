import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInstructors1614279785337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Instructors",
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
    await queryRunner.dropTable("Instructors");
  }
}
