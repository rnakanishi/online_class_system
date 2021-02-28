import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

/**
 * This entity controls which classes each student is taking.
 */
@Entity("instructor_classes")
export class InstructorClasses {
  @PrimaryGeneratedColumn("uuid")
  instructor: string;

  @PrimaryGeneratedColumn("uuid")
  class: string;

  @CreateDateColumn()
  created_at: Date;
}
