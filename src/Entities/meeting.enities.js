const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const meetSchema = new mongoose.Schema({
  mentorId: {
    type: String,
    ref: "User",
    required: true,
  },
  menteeId: {
    type: String,
    ref: "User",
    required: true,
  },
  meetLink: {
    type: String,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
 startDate: {
   type: Date,
      
  },
  endDate: {
   type: Date,
      
  },
  conferenceData: {
    createRequest: {
      requestId: {
        type: String,
        default: uuidv4,
      },
      conferenceSolutionKey: {
        type: {
          type: String,
          default: "hangoutsMeet",
        },
      },
    },
  },
  attendees: [
    {
      email: {
        type: String,
        required: true,
      },
      responseStatus: {
        type: String,
        enum: ["accepted", "declined", "tentative", "needsAction"],
        default: "needsAction",
      },
    },
  ],
}, { timestamps: true });

const Meet = mongoose.model("meet", meetSchema);

module.exports = Meet;
