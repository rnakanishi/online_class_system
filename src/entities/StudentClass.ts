import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

/**
 * This entity controls which classes each student is taking.
 */
@Entity("student_classes")
export class StudentClass {
  @PrimaryGeneratedColumn("uuid")
  student: string;

  @PrimaryGeneratedColumn("uuid")
  class: string;

  @CreateDateColumn()
  created_at: Date;
}
