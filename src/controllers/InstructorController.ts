import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Classes } from "../entity/Classes";
import { Instructors } from "../entity/Instructors";
import { InstructorClasses } from "../entity/InstructorClasses";

export class InstructorController {
  /**
   * Create new instructor into the database.
   * This method checks if the instructor exists and if not, create a new tuple
   * @param req
   * @param res
   */
  async create(req: Request, res: Response) {
    const { name, email, cpf } = req.body;
    const repository = getRepository(Instructors);

    const exists = await repository.findOne({ cpf });
    if (exists) {
      return res.status(400).json({ error: "Instructor already exists " });
    }

    const newInstructor = repository.create({ name, email, cpf });
    await repository.save(newInstructor);

    return res.json(newInstructor);
  }

  async assignToClass(req: Request, res: Response) {
    const { instructorCPF, classId } = req.body;
    const instructorsRepository = getRepository(Instructors);
    const classesRepository = getRepository(Classes);
    const enrollmentRepository = getRepository(InstructorClasses);

    const instructorExists = await instructorsRepository.findOne({
      cpf: instructorCPF,
    });
    if (!instructorExists) {
      return res.status(400).json({ error: "Instructor does not exist" });
    }
    const classWithInstructor = await enrollmentRepository.findOne({
      class: classId,
    });
    if (classWithInstructor) {
      return res.status(400).json({ error: "Class has instructor already. " });
    }
    const classExists = await classesRepository.findOne({ id: classId });
    if (!classExists) {
      return res.status(400).json({ error: "Class does not exist" });
    }

    const enroll = enrollmentRepository.create({
      instructor: instructorExists.id,
      class: classExists.id,
    });
    await enrollmentRepository.save(enroll);

    return res.json(enroll);
  }

  async showAll(req: Request, res: Response) {}
}
