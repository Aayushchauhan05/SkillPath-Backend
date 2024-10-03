const { getAuthClient, createMeeting } = require("../common/services/meetService");
const meetDao = require("../Dao/meet.dao");
const userDao = require("../Dao/user.dao");

module.exports = class MeetServices {
    constructor() {
        this.meetDao = new meetDao();
        this.userDao = new userDao();
    }

    async createMeet(mentorId, menteeId, data) {
        console.log("services->meet.services->createMeet");

        try {
            // Uncomment these lines if you want to verify the existence of mentor and mentee
            /*
            const mentorExist = await this.userDao.findUser(mentorId);
            if (!mentorExist) {
                throw new Error("mentor not found");
            }
            const menteeExist = await this.userDao.findUser(menteeId);
            if (!menteeExist) {
                throw new Error("mentee not found");
            }
            */

            const auth = await getAuthClient();
            console.log(`Auth client obtained: ${auth}`); // Add logging for auth

            console.log("Mentor ID:", mentorId);
            console.log("Mentee ID:", menteeId);
            console.log("Meeting data:", data);

            const responsedata = await createMeeting(auth, data);
            console.log("Response from createMeeting:", responsedata);

            await this.meetDao.createMeet({
                mentorId: mentorId,
                menteeId: menteeId,
                meetLink: responsedata.hangoutLink
            });

            return {
                message: 'Meeting created successfully',
                meetLink: responsedata.hangoutLink,
                eventDetails: responsedata,
            };
        } catch (error) {
            console.error('Error in createMeet service:', error);
           
            throw new Error(`Failed to create meeting: ${error.message}`);
        }
    }
}
