const {google}= require("googleapis")
const fs=require("fs");
 const path= require("path")
 const { authenticate } = require('@google-cloud/local-auth');

 const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
 
 const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');
 async function getAuthClient(){

    const auth = await authenticate({
        keyfilePath: CREDENTIALS_PATH,
        scopes: SCOPES,
      });
    
      const token = auth.credentials;
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      return auth;
      
 }

  async function createMeeting(auth,eventData){
const calendar= google.calendar({version:'v3',auth});
const response = await calendar.events.insert({
    calendarId: 'primary', // Uses the primary calendar of the authenticated user
    requestBody: {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime, // ISO format date-time string
        timeZone: 'America/Los_Angeles',  // Adjust to your timezone
      },
      end: {
        dateTime: eventData.endDateTime,   // ISO format date-time string
        timeZone: 'America/Los_Angeles',  // Adjust to your timezone
      },
      conferenceData: {
        createRequest: {
          requestId: 'some-random-string', // Unique string for identifying the request
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      attendees: eventData.attendees, // Array of attendee emails if you want to invite others
    },
    conferenceDataVersion: 1,  // Required to create a Google Meet link
  })
  return response.data;
  }

  module.exports={createMeeting,getAuthClient}