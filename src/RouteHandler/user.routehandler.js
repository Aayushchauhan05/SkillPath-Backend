const express = require("express");
const authRoutes = require("../Routes/auth.route");

const meetRoutes= require("../Routes/meet.route")
const chatRoutes= require("../Routes/chat.route")
const communicationRoutes= require("../Routes/communication.route")
module.exports = (app) => {
  app.use("/Auth", authRoutes);
  app.use("/meet",meetRoutes)
  app.use("/chat",chatRoutes)
  app.use("/communication",communicationRoutes)
};
