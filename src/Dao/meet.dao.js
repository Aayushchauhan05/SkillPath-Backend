const Meet = require("../Entities/meeting.enities");

module.exports = class MeetDao {
  model = Meet;

  async createMeet(data) {
    return this.model.create(data);
  }

  async getMeetById(id) {
    return this.model.findById(id);
  }

  async getAllMeet() {
    return this.model.find();
  }

  async updateMeet(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMeet(id) {
    return this.model.findByIdAndDelete(id);
  }

  async getMeetsByMentorId(mentorId) {
    return this.model.find({ mentorId });
  }

  async getMeetsByMenteeId(menteeId) {
    return this.model.find({ menteeId });
  }

  async getMeetByMentorAndMentee(mentorId, menteeId) {
    return this.model.findOne({ mentorId, menteeId });
  }

  async getAttendeesByMeetId(id) {
    const meet = await this.model.findById(id);
    return meet ? meet.attendees : [];
  }

  async updateAttendees(id, attendees) {
    return this.model.findByIdAndUpdate(id, { attendees }, { new: true });
  }

  async updateConferenceData(id, conferenceData) {
    return this.model.findByIdAndUpdate(id, { conferenceData }, { new: true });
  }
};
