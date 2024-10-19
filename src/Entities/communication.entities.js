const { Schema, model } = require("mongoose");

const communicationSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"

    },
communication:[{
    type:Schema.Types.ObjectId,
    ref:"chat"
}]
},{timestamps:true});

const communication= model("communication",communicationSchema);

module.exports= communication;

