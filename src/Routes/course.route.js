const express = require("express");
const CourseController = require("../Controller/course.controller");

const router = express.Router();
const courseController = new CourseController();


router.post("/courses", courseController.createCourse);


router.put("/courses/:id", courseController.updateCourse);

router.get("/courses", courseController.getAllCourses);


router.get("/courses/:id", courseController.getCourseById);

router.delete("/courses/:id", courseController.deleteCourse);

module.exports = router;
