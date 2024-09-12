const UserCourseApplication = require("../Entities/userCourseApplication.entities");

module.exports = class UserCourseApplicationDao {
  // Create a new application
  async createApplication(data) {
    return UserCourseApplication.create(data);
  }

  // Update application status by ID
  async updateApplicationStatus(applicationId, status) {
    return UserCourseApplication.findByIdAndUpdate(applicationId, { status }, { new: true });
  }

  // Get all applications for a specific user
  async getApplicationsByUserId(userId) {
    return UserCourseApplication.find({ userId }).populate('courseId');
  }

  // Get all applications for a specific course
  async getApplicationsByCourseId(courseId) {
    return UserCourseApplication.find({ courseId }).populate('userId');
  }

  // Get application by ID
  async getApplicationById(applicationId) {
    return UserCourseApplication.findById(applicationId).populate('userId courseId');
  }
};
