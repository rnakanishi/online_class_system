import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { Students } from "../entities/Students";
import { Classes } from "../entities/Classes";
import { StudentClass } from "../entities/StudentClass";
import { ClassQuestions } from "../entities/ClassQuestions";
import { StudentsRepository } from "../repositories/StudentsRepository";

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
    const studentsRepository = getCustomRepository(StudentsRepository);
    const classesRepository = getRepository(Classes);
    const enrollmentRepository = getRepository(StudentClass);

    const studentExists = await studentsRepository.findOne({ cpf: studentCPF });
    if (!studentExists) {
      return res.status(400).json({ error: "Student does not exist" });
    }
    const classExists = await classesRepository.findOne({ id: classId });
    if (!classExists) {
      return res.status(400).json({ error: "Class does not exist" });
    }
    const studentEnrolled = await enrollmentRepository.findOne({
      student: studentExists.id,
      class: classId,
    });
    if (studentEnrolled) {
      return res.status(400).json({ error: "Student already enrolled." });
    }

    const enroll = enrollmentRepository.create({
      student: studentExists.id,
      class: classExists.id,
    });
    await enrollmentRepository.save(enroll);

    return res.status(201).json(enroll);
  }

  async registerQuestion(req: Request, res: Response) {
    const { studentID, classId, question } = req.body;
    const enrollmentRepository = getRepository(StudentClass);
    const questionsRepository = getRepository(ClassQuestions);

    const studentEnrolled = await enrollmentRepository.find({
      student: studentID,
      class: classId,
    });
    if (!studentEnrolled) {
      return res.status(400).json({ error: "Student not enrolled." });
    }
    const studentAsked = await questionsRepository.find({
      student: studentID,
      class: classId,
    });
    if (studentAsked.length >= 2) {
      return res.status(400).json({ error: "Student already asked twice." });
    }

    const ask = questionsRepository.create({
      student: studentID,
      class: classId,
      question,
    });
    questionsRepository.save(ask);
    return res.json(ask);
  }
}
