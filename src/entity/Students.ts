import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Students {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;
}
