const express = require("express");
const cors = require("cors"); 
const connectDb = require("./src/Db/db.connection");
const setupRoutes = require("./src/RouteHandler/user.routehandler");
require('dotenv').config();
const {app,io,server}= require("./chat-backend/chat-App")



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
connectDb().then(() => {
    server.listen(BACKEND_PORT, () => {
        console.log(`Server is connected on port ${BACKEND_PORT}`);
    });
}).catch((error) => {
    console.log("Internal server error due to connection failure:", error);
});
