const {google}= require("googleapis")
const fs=require("fs");
 const path= require("path")
 const { authenticate } = require('@google-cloud/local-auth');

 const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
 
 const CREDENTIALS_PATH = path.join(__dirname, '../../../credentials.json');
 const TOKEN_PATH = path.join(__dirname, '../../../token.json');
 async function getAuthClient(){

    const auth = await authenticate({
        keyfilePath: CREDENTIALS_PATH,
        scopes: SCOPES,
      });
    
    //   const token = auth.credentials;
    //   fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      return auth;
      
 }

 async function createMeeting(auth, eventData) {
    const calendar = google.calendar({ version: 'v3', auth });
    
    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: eventData.summary,
          description: eventData.description,
          start: {
            dateTime: eventData.startDateTime,
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: eventData.endDateTime,
            timeZone: 'America/Los_Angeles',
          },
          conferenceData: {
            createRequest: {
              requestId: 'some-random-string',
              conferenceSolutionKey: {
                type: 'hangoutsMeet',
              },
            },
          },
          attendees: eventData.attendees,
        },
        conferenceDataVersion: 1,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;  // Rethrow the error to handle it upstream
    }
  }
  

  module.exports={createMeeting,getAuthClient}