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
router.get("/", classes.showAll);
router.get("/classes", classes.showAll);
router.post("/students/enrollment", students.assignToClass);
router.post("/instructors/assign", instructors.assignToClass);
router.post("/students/question", students.registerQuestion);

export { router };
