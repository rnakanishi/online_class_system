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
        name: "student_classes",
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
        foreignKeys: [
          {
            name: "FK_student",
            columnNames: ["student"],
            referencedColumnNames: ["id"],
            referencedTableName: "students",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_class",
            columnNames: ["class"],
            referencedColumnNames: ["id"],
            referencedTableName: "classes",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
