import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStudentClass1614340001336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "StudentClass",
        columns: [
          {
            name: "student",
            type: "uuid",
          },
          {
            name: "class",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "Date",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "StudentClass",
      new TableForeignKey({
        columnNames: ["student"],
        referencedColumnNames: ["id"],
        referencedTableName: "Students",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "StudentClass",
      new TableForeignKey({
        columnNames: ["class"],
        referencedColumnNames: ["id"],
        referencedTableName: "Classes",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
