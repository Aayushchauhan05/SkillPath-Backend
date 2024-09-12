const Course = require("../Entities/courses.entities");

module.exports = class CourseDao {
  // Create a new course
  async createCourse(data) {
    return Course.create(data);
  }

  // Update a course by ID
  async updateCourse(courseId, update) {
    return Course.findByIdAndUpdate(courseId, { ...update }, { new: true });
  }

  // Get all courses
  async getAllCourses() {
    return Course.find();
  }

  // Get a course by ID
  async getCourseById(courseId) {
    return Course.findById(courseId);
  }

  // Delete a course by ID
  async deleteCourse(courseId) {
    return Course.findByIdAndDelete(courseId);
  }
};
