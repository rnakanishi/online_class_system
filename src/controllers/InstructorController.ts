import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClassesRepository } from "../repositories/ClassesRepository";
import { InstructorClassesRepository } from "../repositories/InstructorClassesRepository";
import { InstructorsRepository } from "../repositories/InstructorsRepository";
import { ClassQuestionsRepository } from "../repositories/QuestionsRepository";

export class InstructorController {
  /**
   * Create new instructor into the database.
   * This method checks if the instructor exists and if not, create a new tuple
   * @param req
   * @param res
   */
  async create(req: Request, res: Response) {
    const { name, email, cpf } = req.body;
    const repository = getCustomRepository(InstructorsRepository);

    const exists = await repository.findOne({ cpf });
    if (exists) {
      return res.status(400).json({ error: "Instructor already exists " });
    }

    const newInstructor = repository.create({ name, email, cpf });
    await repository.save(newInstructor);

    return res.status(201).json(newInstructor);
  }

  async assignToClass(req: Request, res: Response) {
    const { instructorCPF, classId } = req.body;
    const instructorsRepository = getCustomRepository(InstructorsRepository);
    const classesRepository = getCustomRepository(ClassesRepository);
    const enrollmentRepository = getCustomRepository(
      InstructorClassesRepository
    );

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

  async getOpenQuestion(req: Request, res: Response) {}

  async answerQuestion(req: Request, res: Response) {
    const { instructorId, classId, question } = req.body;
    const enrollmentRepository = getCustomRepository(InstructorClassesRepository);
    const questionsRepository = getCustomRepository(ClassQuestionsRepository);

    const studentEnrolled = await enrollmentRepository.find({
      instructor: instructorId,
      class: classId,
    });
    if (!studentEnrolled) {
      return res.status(400).json({ error: "Student not enrolled." });
    }
    const studentAsked = await questionsRepository.find({
      instructor: instructorId,
      class: classId,
    });
    if (studentAsked.length >= 2) {
      return res.status(400).json({ error: "Student already asked twice." });
    }

    const ask = questionsRepository.create({
      instructor: instructorId,
      class: classId,
      question,
    });
    questionsRepository.save(ask);
    return res.json(ask);
  }

  async showAll(req: Request, res: Response) {}
}
