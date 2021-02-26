import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

/**
 * This entity controls which classes each student is taking.
 */
@Entity()
export class StudentClasses {
  @PrimaryGeneratedColumn("uuid")
  student: number;

  @PrimaryGeneratedColumn("uuid")
  class: number;

  @CreateDateColumn()
  created_at: Date;
}
