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
    access_type: "online",
    scope: SCOPES,
    prompt: 'consent'
  });
}

async function getAuthClient(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

async function createMeeting(eventData) {
  try {
    let tokens = typeof eventData.tokens === 'string' 
      ? JSON.parse(eventData.tokens) 
      : eventData.tokens;

    console.log("Received tokens:", {
      access_token: tokens.access_token ? "present" : "missing",
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type,
      currentTime: new Date().toISOString()
    });

    
    const authClient = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

   
    authClient.setCredentials({
      access_token: tokens.access_token,
      token_type: 'Bearer'
    });

    const calendar = google.calendar({ 
      version: 'v3', 
      auth: authClient 
    });

    try {
      
      await calendar.calendarList.list();
      console.log("Calendar API access verified");
    } catch (error) {
      console.error("Calendar API access test failed:", error.message);
      throw new Error("Failed to access Calendar API - please re-authenticate");
    }

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
    console.error("Meeting creation error:", {
      message: error.message,
      status: error.status,
      response: error.response?.data
    });

    
    if (error.response?.data?.error) {
      const googleError = error.response.data.error;
      if (googleError.code === 401) {
        throw new Error("Authentication failed - please re-authenticate");
      }
      throw new Error(googleError.message);
    }

   
    if (error.message.includes('invalid_grant')) {
      throw new Error("Invalid credentials - please re-authenticate");
    }

    throw error;
  }
}

module.exports = {
  getAuthUrl,
  getAuthClient,
  createMeeting,
};