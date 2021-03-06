import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateInstructorClass1614364222931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "instructor_classes",
        columns: [
          {
            name: "instructor",
            type: "uuid",
          },
          {
            name: "class",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: "FK_instructor",
            columnNames: ["instructor"],
            referencedColumnNames: ["id"],
            referencedTableName: "instructors",
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
