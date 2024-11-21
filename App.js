const express = require("express");
const cors = require("cors"); 
const connectDb = require("./src/Db/db.connection");
const setupRoutes = require("./src/RouteHandler/user.routehandler");
require('dotenv').config();
const {app,io,server}= require("./chat-backend/chat-App");
const { getAuthUrl, getAuthClient } = require("./src/common/services/meetService");



const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json());
const BACKEND_PORT=process.env.PORT;
console.log(process.env.PORT)
setupRoutes(app);
app.get("/", (req, res) => {
    res.send("Hello from Express!");
  });
  app.get("/auth/url", (req, res) => {
    const authUrl = getAuthUrl();
    res.json({ authUrl });
  });
  
  app.get("/oauth2callback", async (req, res) => {
    const { code } = req.query;
    try {
      const authClient = await getAuthClient(code);
      res.status(200).send({ message: "Authorization successful", tokens: authClient.credentials });
    } catch (error) {
      console.error("OAuth2 callback error:", error);
      res.status(500).send("Error during OAuth2 callback");
    }
  });

  console.log('Starting app...');
  console.log('Express version:', require('express/package.json').version);
  

connectDb().then(() => {
    server.listen(BACKEND_PORT, () => {
        console.log(`Server is connected on port ${BACKEND_PORT}`);
        console.log('Starting app...');
console.log('Express version:', require('express/package.json').version);

    });
}).catch((error) => {
    console.log("Internal server error due to connection failure:", error);
});
