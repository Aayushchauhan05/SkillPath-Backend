const chat = require("../Entities/chat.entitiis")

module.exports= class ChatDao{
    constructor(){
        this.model=  chat
    }

    async createChat (body){
        return this.model.create(body);
    }

    async updateChat (chatId,update){
        return this.model.findByIdAndUpdate(chatId,update,{new:true});
    }
    async deleteChat (chatId){
        return this.model.findByIdAndDelete(chatId);
    }
    async getChats(senderId, receiverId) {
        return this.model.find({
            $or: [
                {
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ]
        }).populate("receiverId");
    }
    
    
}