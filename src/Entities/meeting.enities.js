const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const meetSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  start: {
    dateTime: {
      type: Date,
      required: true,
    },
    timeZone: {
      type: String,
      default: "America/Los_Angeles",
    },
  },
  end: {
    dateTime: {
      type: Date,
      required: true,
    },
    timeZone: {
      type: String,
      default: "America/Los_Angeles",
    },
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
