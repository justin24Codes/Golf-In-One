import express from "express";
import {courses, findCourse} from "../controllers/courses.js";

const router = express.Router();

router.route('/').get(courses);
router.route('/:id').get(findCourse);

export { router as courseRoutes };
