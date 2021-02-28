import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Classes } from "./Classes";
import { Students } from "./Students";
import { v4 as uuid } from "uuid";

@Entity("class_questions")
export class ClassQuestions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany((type) => Students)
  @JoinTable()
  student: Students[];

  @ManyToMany((type) => Classes)
  @JoinTable()
  class: Classes[];

  @Column()
  question: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
