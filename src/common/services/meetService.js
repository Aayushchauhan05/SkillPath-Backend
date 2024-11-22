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
    // Add prompt to ensure we always get a new token
    prompt: 'consent'
  });
}

async function getAuthClient(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("New tokens received:", {
    access_token: tokens.access_token ? "present" : "missing",
    expiry_date: tokens.expiry_date,
    token_type: tokens.token_type
  });
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

async function validateToken(tokens) {
  if (!tokens || !tokens.access_token) {
    throw new Error("No access token provided");
  }

  // Check if token is expired
  const expiryDate = tokens.expiry_date;
  const currentTime = Date.now();
  
  console.log("Token validation:", {
    currentTime,
    expiryDate,
    isExpired: expiryDate ? currentTime >= expiryDate : "unknown",
    timeRemaining: expiryDate ? Math.floor((expiryDate - currentTime) / 1000) + " seconds" : "unknown"
  });

  if (expiryDate && currentTime >= expiryDate) {
    throw new Error("Token has expired");
  }
}

async function createMeeting(eventData) {
  try {
    const tokens = typeof eventData.tokens === 'string' 
      ? JSON.parse(eventData.tokens) 
      : eventData.tokens;

    console.log("Received tokens:", {
      access_token: tokens.access_token ? "present" : "missing",
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type
    });

   
    await validateToken(tokens);

    
    const authClient = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    authClient.setCredentials({
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
    });

    const calendar = google.calendar({ 
      version: 'v3', 
      auth: authClient
    });

    
    try {
      await calendar.calendarList.list();
      console.log("Calendar API test call successful");
    } catch (error) {
      console.error("Calendar API test call failed:", error.message);
      throw new Error("Failed to validate calendar access");
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
      stack: error.stack,
      status: error.status,
      response: error.response?.data
    });

    if (error.message.includes('invalid_grant') || 
        error.message.includes('Invalid Credentials') ||
        error.message.includes('Token has expired')) {
      throw new Error('Session expired. Please re-authenticate.');
    }
    throw error;
  }
}

module.exports = {
  getAuthUrl,
  getAuthClient,
  createMeeting,
};