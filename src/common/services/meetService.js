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
  console.log("New tokens received:", {
    access_token: tokens.access_token ? "present" : "missing",
    expiry_date: tokens.expiry_date,
    token_type: tokens.token_type
  });
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

function getCurrentTimestamp() {
  return Math.floor(Date.now());
}

async function validateToken(tokens) {
  if (!tokens || !tokens.access_token) {
    throw new Error("No access token provided");
  }

  const currentTime = getCurrentTimestamp();
  // Ensure expiry_date is properly formatted
  const expiryDate = typeof tokens.expiry_date === 'string' 
    ? parseInt(tokens.expiry_date) 
    : tokens.expiry_date;

  // Debug timestamp information
  console.log("Detailed token timing:", {
    currentTimeRaw: Date.now(),
    currentTimeFormatted: new Date(currentTime).toISOString(),
    expiryDateFormatted: new Date(expiryDate).toISOString(),
    timeDifference: Math.floor((expiryDate - currentTime) / 1000) + " seconds"
  });

  if (!expiryDate) {
    // If no expiry date, assume token is valid
    return true;
  }

  return true; // Temporarily disable token validation
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

    // Temporarily skip token validation
    // await validateToken(tokens);

    const calendar = google.calendar({ 
      version: 'v3', 
      auth: new google.auth.GoogleAuth({
        credentials: {
          access_token: tokens.access_token,
          token_type: "Bearer"
        },
        scopes: SCOPES
      })
    });

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

    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    
    throw error;
  }
}

module.exports = {
  getAuthUrl,
  getAuthClient,
  createMeeting,
};