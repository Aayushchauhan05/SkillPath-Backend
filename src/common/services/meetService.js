const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { v4 } = require("uuid");
require("dotenv").config();

const SCOPES = [
 "https://www.googleapis.com/auth/calendar", 
 "https://www.googleapis.com/auth/calendar.events"
];
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

 if (!tokens || !tokens.access_token) {
   throw new Error("Missing access token. Please re-authenticate.");
 }

 const meetingClient = new OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   redirectUri
 );

 meetingClient.credentials = {
   access_token: tokens.access_token,
   token_type: tokens.token_type || 'Bearer'
 };

 try {
   const calendar = google.calendar({ version: 'v3', auth: meetingClient });

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
 } catch (error) {
   console.error('Meeting creation error:', error);
   throw new Error('Failed to create meeting. Please re-authenticate.');
 }
}

module.exports = {
 getAuthUrl,
 getAuthClient,
 createMeeting,
};