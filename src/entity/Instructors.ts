import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Instructors {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;
}
