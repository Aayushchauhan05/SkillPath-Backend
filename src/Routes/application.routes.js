const express = require("express");
const UserCourseApplicationController = require("../Controller/userCourseApplication.controller");

const router = express.Router();
const applicationController = new UserCourseApplicationController();

router.post("/applications", applicationController.applyForCourse);

router.put("/applications/:id/status", applicationController.updateApplicationStatus);


router.get("/applications/user/:userId", applicationController.getUserApplications);

router.get("/applications/course/:courseId", applicationController.getCourseApplications);

router.get("/applications/:id", applicationController.getApplicationById);

module.exports = router;
