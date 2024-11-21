const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { v4 } = require("uuid");
require("dotenv").config();

const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"];
const redirectUri = process.env.FRONTEND_REDIRECT_URI;
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

 function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

async function getAuthClient(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

async function createMeeting(eventData) {

const tokens = typeof eventData.tokens === 'string' 
      ? JSON.parse(eventData.tokens) 
      : eventData.tokens;
      console.log(tokens);
if (!tokens || !tokens.access_token ) {
  throw new Error("Missing access_token or refresh_token in the provided tokens.");
}


oAuth2Client.setCredentials({
  access_token: tokens.access_token,
  scope: tokens.scope,
  token_type: tokens.token_type,
  expiry_date: tokens.expiry_date,
});


await oAuth2Client.getAccessToken();

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: new Date(eventData.startDate).toISOString(),
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: new Date(eventData.endDate).toISOString(),
        timeZone: "America/Los_Angeles",
      },
      conferenceData: {
        createRequest: {
          requestId: v4(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      attendees: eventData.attendees,
    },
    conferenceDataVersion: 1,
  });

  return response.data;
}

module.exports = {
  getAuthUrl,
  getAuthClient,
  createMeeting,
};
