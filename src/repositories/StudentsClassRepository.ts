import { EntityRepository, Repository } from "typeorm";
import { StudentClass } from "../entities/StudentClass";

@EntityRepository(StudentClass)
export class StudentClassRepository extends Repository<StudentClass> {}
