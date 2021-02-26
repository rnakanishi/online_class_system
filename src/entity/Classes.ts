import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Classes {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  period: number;

  @Column()
  year: number;

  @Column()
  duration: number;

  @CreateDateColumn()
  created_at: Date;
}
