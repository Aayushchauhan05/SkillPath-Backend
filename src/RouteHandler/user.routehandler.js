const express = require("express");
const authRoutes = require("../Routes/auth.route");
const meetRoutes= require("../Routes/meet.route")
const chatRoutes= require("../Routes/chat.route")
const communicationRoutes= require("../Routes/communication.route")
const listingRoutes=require("../Routes/listing.route")
const bidRoutes= require("../Routes/bid.route")
const conversationRoutes=require("../Routes/conversation.route")
module.exports = (app) => {
  app.use("/Auth", authRoutes);
  app.use("/meet",meetRoutes)
  app.use("/chat",chatRoutes)
  app.use("/communication",communicationRoutes)
  app.use("/listing",listingRoutes)
  app.use("/bid",bidRoutes)
  app.use("/conversation",conversationRoutes)
};
