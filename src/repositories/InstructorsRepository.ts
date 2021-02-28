import { EntityRepository, Repository } from "typeorm";
import { Instructors } from "../entities/Instructors";

@EntityRepository(Instructors)
export class InstructorsRepository extends Repository<Instructors> {}
