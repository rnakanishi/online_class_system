import { Router } from "express";
import { StudentController } from "./controllers/StudentController";
import { InstructorController } from "./controllers/InstructorController";
import { ClassController } from "./controllers/ClassController";

const router = Router();
const students = new StudentController();
const instructors = new InstructorController();
const classes = new ClassController();

router.post("/students", students.create);
router.post("/instructors", instructors.create);
router.post("/classes", classes.create);
router.post("/students/enrollment", students.assignToClass);

export { router };
