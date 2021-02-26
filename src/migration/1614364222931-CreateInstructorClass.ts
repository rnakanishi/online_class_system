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
        name: "InstructorClasses",
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
      })
    );

    await queryRunner.createForeignKeys("InstructorClasses", [
      new TableForeignKey({
        columnNames: ["instructor"],
        referencedColumnNames: ["id"],
        referencedTableName: "Instructors",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["class"],
        referencedColumnNames: ["id"],
        referencedTableName: "Classes",
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
