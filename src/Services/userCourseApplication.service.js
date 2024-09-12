const UserCourseApplicationDao = require("../Dao/userCourseApplication.dao");
const UserDao = require("../Dao/user.dao");  // Assuming a UserDao exists to fetch user data
const CourseDao = require("../Dao/course.dao");  // Assuming a CourseDao exists to fetch course data

module.exports = class UserCourseApplicationService {
  constructor() {
    this.applicationDao = new UserCourseApplicationDao();
    this.userDao = new UserDao();  // Initialize UserDao
    this.courseDao = new CourseDao();  // Initialize CourseDao
  }

  // Service to apply for a course with checkpoints
  async applyForCourse(data) {
    console.log("Applying for course...");

    // Check if user exists
    const user = await this.userDao.getUserById(data.userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Check if course exists
    const course = await this.courseDao.getCourseById(data.courseId);
    if (!course) {
      throw new Error("Course does not exist");
    }

    // Check if the user has already applied for this course
    const existingApplication = await this.applicationDao.getApplicationByUserIdAndCourseId(data.userId, data.courseId);
    if (existingApplication) {
      throw new Error("User has already applied for this course");
    }

    return await this.applicationDao.createApplication(data);
  }

  // Service to update the status of an application with checkpoints
  async updateApplicationStatus(applicationId, status) {
    console.log("Updating application status...");

    // Check if application exists
    const application = await this.applicationDao.getApplicationById(applicationId);
    if (!application) {
      throw new Error("Application does not exist");
    }

    return await this.applicationDao.updateApplicationStatus(applicationId, status);
  }

  // Service to get all applications by user ID
  async getUserApplications(userId) {
    console.log("Fetching user applications...");

    // Check if user exists
    const user = await this.userDao.getUserById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    return await this.applicationDao.getApplicationsByUserId(userId);
  }

  // Service to get all applications for a specific course
  async getCourseApplications(courseId) {
    console.log("Fetching course applications...");

    // Check if course exists
    const course = await this.courseDao.getCourseById(courseId);
    if (!course) {
      throw new Error("Course does not exist");
    }

    return await this.applicationDao.getApplicationsByCourseId(courseId);
  }

  // Service to get a specific application by ID
  async getApplicationById(applicationId) {
    console.log("Fetching application by ID...");

    // Check if application exists
    const application = await this.applicationDao.getApplicationById(applicationId);
    if (!application) {
      throw new Error("Application does not exist");
    }

    return application;
  }
};
