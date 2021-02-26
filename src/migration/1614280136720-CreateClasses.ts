import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClasses1614280136720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Classes",
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
            name: "period",
            type: "int",
          },
          {
            name: "year",
            type: "int",
          },
          {
            name: "duration", // duration in hours
            type: "float",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "Date",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Classes");
  }
}
