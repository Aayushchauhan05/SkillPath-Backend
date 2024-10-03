const mongoose = require("mongoose");

 const meetSchema= new mongoose.Schema({
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

 const Meet=  mongoose.model("meet",meetSchema);
 module.exports= Meet;