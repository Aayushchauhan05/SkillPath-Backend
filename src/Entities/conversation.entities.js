const { Schema, model } = require("mongoose");

const conversationSchema= new Schema({
    userId:{
        type:String,
        ref:"User"

    },
conversations:[{
    type:String,
    ref:"User"
}]
},{timestamps:true});

const conversation= model("conversation",conversationSchema);

module.exports= conversation;

