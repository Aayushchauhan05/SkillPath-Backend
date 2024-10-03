const meet = require("../Entities/meeting.enities")

module.exports= class meetDao{

    constructor(){
        this.model= new meet;
    }

    async createMeet(data){
        return await this.model.create(data)
    }
}