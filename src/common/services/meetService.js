const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { v4 } = require("uuid");
require("dotenv").config();

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
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
    prompt: "consent", 
  });
}


async function getAuthClient(code) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens.refresh_token) {
      console.warn(
        "No refresh token received. The user might have already granted consent before."
      );
    }

    oAuth2Client.setCredentials(tokens);
    return oAuth2Client;
  } catch (error) {
    console.error("Error while getting tokens:", error.message);
    throw new Error("Failed to exchange authorization code for tokens.");
  }
}


async function createMeeting(eventData) {
  try {
    const tokens =
      typeof eventData.tokens === "string"
        ? JSON.parse(eventData.tokens)
        : eventData.tokens;

    console.log("Tokens received for event creation:", {
      access_token: tokens.access_token ? "present" : "missing",
      refresh_token: tokens.refresh_token ? "present" : "missing",
      expiry_date: tokens.expiry_date,
    });

    
    const authClient = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    authClient.setCredentials(tokens);

   
    const calendar = google.calendar({ version: "v3", auth: authClient });

   
    try {
      await calendar.calendarList.list();
      console.log("Calendar API access verified.");
    } catch (error) {
      console.error("Failed to access Calendar API:", error.message);
      throw new Error("Authentication failed - please re-authenticate.");
    }

  
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: new Date(eventData.startDate).toISOString(),
          timeZone: eventData.timeZone || "UTC",
        },
        end: {
          dateTime: new Date(eventData.endDate).toISOString(),
          timeZone: eventData.timeZone || "UTC",
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

    console.log("Event created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while creating meeting:", error.message);

    
    if (error.response?.data?.error) {
      const googleError = error.response.data.error;

      if (googleError.code === 401) {
        throw new Error("Authentication failed - please re-authenticate.");
      }

      throw new Error(googleError.message || "Google API error.");
    }

    if (error.message.includes("invalid_grant")) {
      throw new Error(
        "Invalid grant. Check your credentials or re-authenticate."
      );
    }

    throw error;
  }
}

module.exports = {
  getAuthUrl,
  getAuthClient,
  createMeeting,
};
