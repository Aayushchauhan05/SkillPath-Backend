const statusConstant = require("../constant/status.constant");
const MeetServices = require("../Services/meet.service")

module.exports= class MeetController{
    constructor(){
        this.meetService= new MeetServices;
    }

    async createMeet(request,response){

        console.log("Controller->meet.controller.js->createMeet");

        try {
            const {mentorId,menteeId}=req.query;
            const data= await this.meetService.createMeet(mentorId,menteeId,request.body)
            response.send(statusConstant.created).send(data)
        } catch (error) {
            if(error.message.contains("mentor not found")){
                response.send(statusConstant.notFound).send({message:"mentor not found"})
            }
            else if(error.message.contains("mentee not found")){
                response.send(statusConstant.notFound).send({message:"mentee not found"})
            }
            else{
                response.send(statusConstant.serverError).send({message:"Internal server error"})
            }
               
        }
    }

}