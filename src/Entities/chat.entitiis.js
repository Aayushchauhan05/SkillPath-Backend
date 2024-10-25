const { Schema, model } = require("mongoose");

const chatSchema= new Schema({
    senderId:{
        type:String,
        ref:"User"
    },
    receiverId:{
        type:String,
        ref:"User"
    },
    message:{
        sender:{
            type:String,
        ref:"User"
        },
        text:{
            type:String
        }

    }
},{timestamps:true});


const chat = model("chat",chatSchema);
 module.exports= chat;