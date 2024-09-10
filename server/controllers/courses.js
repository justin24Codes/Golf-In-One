import Course from "../models/course.js";

export const courses = async (req,res) => {
    const courses = await Course.find({});
    res.json(courses);
};

export const findCourse = async (req,res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
          return res.status(404).send("Course not found");
        }
        res.json(course);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
};