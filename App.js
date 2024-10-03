const express = require("express");
const cors = require("cors"); 
const connectDb = require("./src/Db/db.connection");
const setupRoutes = require("./src/RouteHandler/user.routehandler");

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json());

setupRoutes(app);
connectDb().then(() => {
    app.listen(5000, () => {
        console.log("Server is connected on port 5000");
    });
}).catch((error) => {
    console.log("Internal server error due to connection failure:", error);
});
