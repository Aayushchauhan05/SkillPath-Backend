const { Schema, default: mongoose, model } = require("mongoose");

 const meetSchema= new Schema({
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }, 
     menteeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    meetLink:{
type:String
    }
 })

 const meet= new model("meet",meetSchema);
 module.exports= meet;