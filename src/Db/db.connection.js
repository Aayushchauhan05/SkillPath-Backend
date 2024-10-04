const mongoose=require("mongoose")
require('dotenv').config()
const Uri=process.env.DB_CONNECTION
const connectDb=  async ()=>{
    try {
        await mongoose.connect(Uri)
        console.log("Database is connected");

    } catch (error) {
        console.log(error,"error in database connect")
    }
}
module.exports= connectDb