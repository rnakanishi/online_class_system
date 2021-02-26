import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Classes } from "../entity/Classes";

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
      return res.status(400).json({ error: "Instructor already exists " });
    }

    const newClass = repository.create({ name, year, period, duration });
    await repository.save(newClass);

    return res.json(newClass);
  }

  async showAll(req: Request, res: Response) {}
}
