const Meet = require("../Entities/meeting.enities")

module.exports= class meetDao{

   

    createMeet=async (data)=>{
        return Meet.create(data)
    }
}