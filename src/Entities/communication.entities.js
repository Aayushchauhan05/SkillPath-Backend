const { Schema, model } = require("mongoose");

const communicationSchema= new Schema({
    userId:{
        type:String,
        ref:"User"

    },
communication:[{
    type:String,
    ref:"chat"
}]
},{timestamps:true});

const communication= model("communication",communicationSchema);

module.exports= communication;

