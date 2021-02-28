import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Classes } from "../entities/Classes";

export class ClassController {
  /**
   * Create new instructor into the database.
   * This method checks if the instructor exists and if not, create a new tuple
   * @param req
   * @param res
   */
  async create(req: Request, res: Response) {
    const { name, period, year, duration } = req.body;
    const repository = getRepository(Classes);

    const exists = await repository.findOne({ name, year, period });
    if (exists) {
      return res.status(400).json({ error: "Class already registered" });
    }

    const newClass = repository.create({ name, year, period, duration });
    await repository.save(newClass);

    return res.status(201).json(newClass);
  }

  async showAll(req: Request, res: Response) {
    const repository = getRepository(Classes);

    const allClasses = await repository.find();
    return res.json(allClasses);
  }
}
