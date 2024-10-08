const statusConstant = require("../constant/status.constant");
const MeetServices = require("../Services/meet.service")

module.exports= class MeetController{
    constructor(){
        this.meetService= new MeetServices();
    }

    createMeet= async (request,response)=>{

        console.log("Controller->meet.controller.js->createMeet");

        try {
            const {mentorId,menteeId}=request.query;
            console.log({mentorId,menteeId})
            const data= await this.meetService.createMeet(mentorId,menteeId,request.body)
            console.log(data)
            response.status(statusConstant.created).send(data)
        } catch (error) {
            console.log(error)
            if(error.message=="mentor not found"){
                response.status(statusConstant.notFound).send({message:"mentor not found"})
            }
            else if(error.message=="mentee not found"){
                response.status(statusConstant.notFound).send({message:"mentee not found"})
            }
            else{
                response.status(statusConstant.serverError).send({message:"Internal server error"})
            }
               
        }
    }

}