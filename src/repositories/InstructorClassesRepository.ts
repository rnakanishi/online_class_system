import { EntityRepository, Repository } from "typeorm";
import { InstructorClasses } from "../entities/InstructorClasses";

@EntityRepository(InstructorClasses)
export class InstructorClassesRepository extends Repository<InstructorClasses> {}
