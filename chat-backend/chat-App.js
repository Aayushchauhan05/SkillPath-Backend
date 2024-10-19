const {Server} = require("socket.io")
const express=require("express")
const http= require("http")
 const app =express();
  const server= http.createServer(app);
  const io= new Server(server,{
  cors: { origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, }
});

io.on("connection",(socket)=>{
    console.log("socket",socket.id);





    socket.on("disconnect",()=>{
        console.log("client disconnected",socket.id)
    })
})

module.exports={io,app,server}
