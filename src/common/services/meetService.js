const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { v4 } = require("uuid");
require("dotenv").config();

const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"];
const redirectUri = process.env.FRONTEND_REDIRECT_URI;
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);
console.log('OAuth2Client Config:', oAuth2Client);
 function getAuthUrl() {
  console.log('OAuth2Client Config:', oAuth2Client);
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
// Check if tokens are present
console.log(eventData);
const tokens = typeof eventData.tokens === 'string' 
      ? JSON.parse(eventData.tokens) 
      : eventData.tokens;
      console.log("test",tokens)
if (!tokens || !tokens.access_token || !tokens.refresh_token) {
  throw new Error("Missing access_token or refresh_token in the provided tokens.");
}

console.log("Received tokens:", tokens);

// Set the credentials for the OAuth2 client
oAuth2Client.setCredentials({
  access_token: tokens.access_token,
  refresh_token: tokens.refresh_token,
  scope: tokens.scope,
  token_type: tokens.token_type,
  expiry_date: tokens.expiry_date,
});

// Verify tokens to ensure they are valid
await oAuth2Client.getAccessToken();

// Initialize the Google Calendar API
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
