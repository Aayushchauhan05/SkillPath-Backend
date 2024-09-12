const UserCourseApplicationService = require("../Services/userCourseApplication.service");
const { created, success, notFound, alreadyExist, serverError } = require("../constant/status.constant.js");

module.exports = class UserCourseApplicationController {
  constructor() {
    this.applicationService = new UserCourseApplicationService();
  }

  // Controller for applying to a course
  applyForCourse = async (req, res) => {
    try {
      console.log("Controller -> applyForCourse");
      const data = req.body;
      const result = await this.applicationService.applyForCourse(data);
      return res.status(created).send(result);
    } catch (error) {
      console.log(error, "Error in applying for course");
      if (error.message === "User does not exist" || error.message === "Course does not exist") {
        return res.status(notFound).send({ message: error.message });
      } else if (error.message === "User has already applied for this course") {
        return res.status(alreadyExist).send({ message: error.message });
      } else {
        return res.status(serverError).send({ message: "Internal server error" });
      }
    }
  };

  // Controller for updating the application status
  updateApplicationStatus = async (req, res) => {
    try {
      console.log("Controller -> updateApplicationStatus");
      const { applicationId, status } = req.body;
      const result = await this.applicationService.updateApplicationStatus(applicationId, status);
      return res.status(success).send(result);
    } catch (error) {
      console.log(error, "Error in updating application status");
      if (error.message === "Application does not exist") {
        return res.status(notFound).send({ message: error.message });
      } else {
        return res.status(serverError).send({ message: "Internal server error" });
      }
    }
  };

  // Controller for getting all applications by user ID
  getUserApplications = async (req, res) => {
    try {
      console.log("Controller -> getUserApplications");
      const userId = req.params.userId;
      const result = await this.applicationService.getUserApplications(userId);
      return res.status(success).send(result);
    } catch (error) {
      console.log(error, "Error in fetching user applications");
      if (error.message === "User does not exist") {
        return res.status(notFound).send({ message: error.message });
      } else {
        return res.status(serverError).send({ message: "Internal server error" });
      }
    }
  };

  // Controller for getting all applications for a specific course
  getCourseApplications = async (req, res) => {
    try {
      console.log("Controller -> getCourseApplications");
      const courseId = req.params.courseId;
      const result = await this.applicationService.getCourseApplications(courseId);
      return res.status(success).send(result);
    } catch (error) {
      console.log(error, "Error in fetching course applications");
      if (error.message === "Course does not exist") {
        return res.status(notFound).send({ message: error.message });
      } else {
        return res.status(serverError).send({ message: "Internal server error" });
      }
    }
  };

  // Controller for getting a specific application by ID
  getApplicationById = async (req, res) => {
    try {
      console.log("Controller -> getApplicationById");
      const applicationId = req.params.applicationId;
      const result = await this.applicationService.getApplicationById(applicationId);
      return res.status(success).send(result);
    } catch (error) {
      console.log(error, "Error in fetching application by ID");
      if (error.message === "Application does not exist") {
        return res.status(notFound).send({ message: error.message });
      } else {
        return res.status(serverError).send({ message: "Internal server error" });
      }
    }
  };
};
