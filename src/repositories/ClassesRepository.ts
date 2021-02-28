import { EntityRepository, Repository } from "typeorm";
import { Classes } from "../entities/Classes";

@EntityRepository(Classes)
export class ClassesRepository extends Repository<Classes> {}
