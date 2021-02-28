import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClassesRepository } from "../repositories/ClassesRepository";

export class ClassController {
  /**
   * Create new instructor into the database.
   * This method checks if the instructor exists and if not, create a new tuple
   * @param req
   * @param res
   */
  async create(req: Request, res: Response) {
    const { name, period, year, duration } = req.body;
    const repository = getCustomRepository(ClassesRepository);

    const exists = await repository.findOne({ name, year, period });
    if (exists) {
      return res.status(400).json({ error: "Class already registered" });
    }

    const newClass = repository.create({ name, year, period, duration });
    await repository.save(newClass);

    return res.status(201).json(newClass);
  }

  async showAll(req: Request, res: Response) {
    const repository = getCustomRepository(ClassesRepository);

    const allClasses = await repository.find();
    return res.json(allClasses);
  }
}
