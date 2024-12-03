const { getAuthClient, createMeeting, getAuthUrl } = require("../common/services/meetService");
const meetDao = require("../Dao/meet.dao");
const userDao = require("../Dao/user.dao");

module.exports = class MeetServices {
    constructor() {
        this.meetDao = new meetDao();
        this.userDao = new userDao();
    }

    async  createMeet(mentorId, menteeId, eventData) {
        
    
        
        // if (!authUrl) {
        //     throw new Error("Authentication URL could not be generated.");
        // }
        console.log("hitting api service")
    
        
        const meetingData = await createMeeting(eventData);
    
        await this.meetDao.createMeet({
            mentorId,
            menteeId,
            meetLink: meetingData.hangoutLink,
            ...eventData,
            tokens:"",
            code:""
            
        });
    
        return {
            message: 'Meeting created successfully',
            meetLink: meetingData.hangoutLink,
            eventDetails: meetingData,
        };
    }
    

    async getMeetById(id) {
        const meeting = await this.meetDao.getMeetById(id);
        if (!meeting) {
            throw new Error("Meeting not found");
        }
        return meeting;
    }

    async getAllMeet() {
        return this.meetDao.getAllMeet();
    }

    async updateMeet(id, data) {
        const updatedMeeting = await this.meetDao.updateMeet(id, data);
        if (!updatedMeeting) {
            throw new Error("Meeting not found");
        }
        return updatedMeeting;
    }

    async deleteMeet(id) {
        const deletedMeeting = await this.meetDao.deleteMeet(id);
        if (!deletedMeeting) {
            throw new Error("Meeting not found");
        }
        return {
            message: 'Meeting deleted successfully'
        };
    }

    async getMeetsByMentorId(mentorId) {
        const mentor = await this.meetDao.getMeetsByMentorId(mentorId);
        if (!mentor) {
            throw new Error("mentor not found");
        }
        return this.meetDao.getMeetsByMentorId(mentorId);
    }

    async getMeetsByMenteeId(menteeId) {
        return this.meetDao.getMeetsByMenteeId(menteeId);
    }

    async getMeetByMentorAndMentee(mentorId, menteeId) {
        const meeting = await this.meetDao.getMeetByMentorAndMentee(mentorId, menteeId);
        if (!meeting) {
            throw new Error("Meeting not found");
        }
        return meeting;
    }

    async getAttendeesByMeetId(id) {
        const attendees = await this.meetDao.getAttendeesByMeetId(id);
        if (!attendees) {
            throw new Error("Meeting not found");
        }
        return attendees;
    }

    async updateAttendees(id, attendees) {
        const updatedMeeting = await this.meetDao.updateAttendees(id, attendees);
        if (!updatedMeeting) {
            throw new Error("Meeting not found");
        }
        return updatedMeeting;
    }

    async updateConferenceData(id, conferenceData) {
        const updatedMeeting = await this.meetDao.updateConferenceData(id, conferenceData);
        if (!updatedMeeting) {
            throw new Error("Meeting not found");
        }
        return updatedMeeting;
    }
}
