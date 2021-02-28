import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateClassQuestions1614369277946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "class_questions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "student",
            type: "uuid",
          },
          {
            name: "class",
            type: "uuid",
          },
          {
            name: "question",
            type: "text",
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
          },
          {
            name: "FK_class",
            columnNames: ["class"],
            referencedColumnNames: ["id"],
            referencedTableName: "classes",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
