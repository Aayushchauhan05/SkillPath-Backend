const express = require("express");
const authRoutes = require("../Routes/Auth.route");

const meetRoutes= require("../Routes/meet.route")
module.exports = (app) => {
  app.use("/Auth", authRoutes);
  app.use("/meet",meetRoutes)
};
