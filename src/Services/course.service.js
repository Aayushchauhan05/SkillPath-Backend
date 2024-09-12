const CourseDao = require("../Dao/course.dao");

module.exports = class CourseService {
  constructor() {
    this.courseDao = new CourseDao();
  }

  async createCourse(data) {
    console.log("Creating a new course...");
    return await this.courseDao.createCourse(data);
  }


  async updateCourse(courseId, update) {
    console.log("Updating the course...");
    return await this.courseDao.updateCourse(courseId, update);
  }


  async getAllCourses() {
    console.log("Fetching all courses...");
    return await this.courseDao.getAllCourses();
  }

  async getCourseById(courseId) {
    console.log("Fetching the course by ID...");
    return await this.courseDao.getCourseById(courseId);
  }


  async deleteCourse(courseId) {
    console.log("Deleting the course...");
    return await this.courseDao.deleteCourse(courseId);
  }
};
