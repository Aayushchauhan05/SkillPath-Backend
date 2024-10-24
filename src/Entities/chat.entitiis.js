const { Schema, model } = require("mongoose");

const chatSchema= new Schema({
    senderId:{
        type:String,
        ref:"user"
    },
    receiverId:{
        type:String,
        ref:"user"
    },
    message:{
        sender:{
            type:String,
        ref:"user"
        },
        text:{
            type:String
        }

    }
},{timestamps:true});


const chat = model("chat",chatSchema);
 module.exports= chat;