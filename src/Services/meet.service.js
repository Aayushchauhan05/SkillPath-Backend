const { getAuthClient, createMeeting } = require("../common/services/meetService");
const meetDao = require("../Dao/meet.dao");
const userDao = require("../Dao/user.dao");

module.exports= class MeetServices{
    constructor(){
        this.meetDao= new meetDao
        this.userDao= new userDao;
    }

    async createMeet(mentorId,menteeId,data){
        console.log("services->meet.services->createMeet");
       const mentorExist= await this.userDao.findUser(mentorId);
        if (mentorExist) {
            throw new Error("mentor not found")
        }
        const menteeExist= await this.userDao.findUser(menteeId);
        if (menteeExist) {
            throw new Error("mentee not found")
        }
        const auth= await getAuthClient();


        
        const responsedata= await createMeeting(auth,data)
        await this.meetDao.createMeet({mentorId:mentorId,menteeId:menteeId,meetLink:responsedata.event.hangoutLink});
        return {
            message: 'Meeting created successfully',
            meetLink: responsedata.hangoutLink,
            eventDetails: responsedata,
        }
    }
}