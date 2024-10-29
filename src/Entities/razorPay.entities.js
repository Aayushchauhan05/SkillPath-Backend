const {Schema, Model, model} =require("mongoose")
const razorSchema= new Schema({

    userName:{
        type:String
    },phone:{
        type:String
    },
    email:{
        type:String
    },
    razorpayCustomerId:{
type:String
    }
});
 const RazorPayUser= model ("RazorPayUser",razorSchema);
 module.exports=RazorPayUser;