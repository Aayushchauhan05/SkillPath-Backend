const express= require("express")
const MeetController = require("../Controller/meet.controller");
const { CREATE_MEET } = require("../constant/meet.constant");
const route= express.Router()
const meetController = new MeetController();


route.post(CREATE_MEET,meetController.createMeet)

module.exports= route;
