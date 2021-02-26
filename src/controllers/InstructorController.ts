import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Instructors } from "../entity/Instructors";

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

  async showAll(req: Request, res: Response) {}
}
