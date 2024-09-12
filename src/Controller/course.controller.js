const CourseService = require("../Services/course.service");

module.exports = class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  // Controller method to create a course
  createCourse = async (req, res) => {
    try {
      const data = await this.courseService.createCourse(req.body);
      return res.status(201).send(data);
    } catch (error) {
      console.error("Error in creating course:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  // Controller method to update a course
  updateCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const update = req.body;
      const data = await this.courseService.updateCourse(courseId, update);
      if (!data) {
        return res.status(404).send({ message: "Course not found" });
      }
      return res.status(200).send(data);
    } catch (error) {
      console.error("Error in updating course:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  // Controller method to get all courses
  getAllCourses = async (req, res) => {
    try {
      const data = await this.courseService.getAllCourses();
      return res.status(200).send(data);
    } catch (error) {
      console.error("Error in fetching courses:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  // Controller method to get a course by ID
  getCourseById = async (req, res) => {
    try {
      const courseId = req.params.id;
      const data = await this.courseService.getCourseById(courseId);
      if (!data) {
        return res.status(404).send({ message: "Course not found" });
      }
      return res.status(200).send(data);
    } catch (error) {
      console.error("Error in fetching course:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  // Controller method to delete a course
  deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const data = await this.courseService.deleteCourse(courseId);
      if (!data) {
        return res.status(404).send({ message: "Course not found" });
      }
      return res.status(200).send({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error in deleting course:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };
};
