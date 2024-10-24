const { getAuthClient, createMeeting } = require("../common/services/meetService");
const meetDao = require("../Dao/meet.dao");
const userDao = require("../Dao/user.dao");

module.exports = class MeetServices {
    constructor() {
        this.meetDao = new meetDao();
        this.userDao = new userDao();
    }

    async createMeet(mentorId, menteeId, data) {
        const auth = await getAuthClient();
        const responsedata = await createMeeting(auth, data);

        await this.meetDao.createMeet({
            mentorId: mentorId,
            menteeId: menteeId,
            meetLink: responsedata.hangoutLink,
            ...data
        });

        return {
            message: 'Meeting created successfully',
            meetLink: responsedata.hangoutLink,
            eventDetails: responsedata,
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
