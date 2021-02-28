import { EntityRepository, Repository } from "typeorm";
import { Students } from "../entities/Students";

@EntityRepository(Students)
export class StudentsRepository extends Repository<Students> {}
