import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../entity/Students";
import { Classes } from "../entity/Classes";
import { StudentClasses } from "../entity/StudentClasses";

export class StudentController {
  /**
   * Create new student into the database.
   * This method checks if the student exists and if not, create a new tuple
   * @param req
   * @param res
   */
  async create(req: Request, res: Response) {
    const { name, email, cpf } = req.body;
    const repository = getRepository(Students);

    const cpfExists = await repository.findOne({ cpf });
    if (cpfExists) {
      return res.status(400).json({ error: "User CPF already registered " });
    }
    const emailExists = await repository.findOne({ email });
    if (cpfExists) {
      return res
        .status(400)
        .json({ error: "Email already registered to a different CPF" });
    }

    const newStudent = repository.create({ name, email, cpf });
    await repository.save(newStudent);

    return res.json(newStudent);
  }

  async assignToClass(req: Request, res: Response) {
    const { studentCPF, classId } = req.body;
    const studentsRepository = getRepository(Students);
    const classesRepository = getRepository(Classes);
    const enrollmentRepository = getRepository(StudentClasses);

    const studentExists = await studentsRepository.findOne({ cpf: studentCPF });
    if (!studentExists) {
      return res.status(400).json({ error: "Student does not exist" });
    }
    const classExists = await classesRepository.findOne({ id: classId });
    if (!classExists) {
      return res.status(400).json({ error: "Class does not exist" });
    }

    const enroll = enrollmentRepository.create({
      student: studentExists.id,
      class: classExists.id,
    });
    await enrollmentRepository.save(enroll);

    return res.json(enroll);
  }
}
