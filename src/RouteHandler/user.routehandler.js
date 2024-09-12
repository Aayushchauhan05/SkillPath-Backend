const express = require("express");
const authRoutes = require("../Routes/Auth.route");
const quizRoutes= require("../Routes/quiz.route")
const courseRoutes= require("../Routes/course.route")
const applicationRoutes = require("../Routes/application.routes");

module.exports = (app) => {
  app.use("/Auth", authRoutes);
  app.use("/quiz",quizRoutes)
  app.use("/course",courseRoutes)
  app.use("/application", applicationRoutes);
};
