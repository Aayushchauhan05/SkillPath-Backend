const express= require("express")
const MeetController = require("../Controller/meet.controller");
const { CREATE_MEET, GET_MEET_BY_MENTOR_ID } = require("../constant/meet.constant");
const route= express.Router()
const meetController = new MeetController();


route.post(CREATE_MEET,meetController.createMeet)
route.get(GET_MEET_BY_MENTOR_ID,meetController.getMeetByMentor)
module.exports= route;
