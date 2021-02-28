import { EntityRepository, Repository } from "typeorm";
import { ClassQuestions } from "../entities/ClassQuestions";

@EntityRepository(ClassQuestions)
export class ClassQuestionsRepository extends Repository<ClassQuestions> {}
