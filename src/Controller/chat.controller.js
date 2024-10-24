const ChatServices = require("../Services/chat.services");

module.exports = class ChatController {
    constructor() {
        this.chatServices = new ChatServices();
        console.log("ChatServices instance created:", this.chatServices);
    }

     createChat= async(req, res) =>{
        try {
            console.log("controller",req.body)
            const chat = await this.chatServices.createChat(req.body);
            res.status(201).json(chat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateChat(req, res) {
        try {
            const chatId = req.params.chatId;
            const updatedChat = await this.chatServices.updateChat(chatId, req.body);
            res.status(200).json(updatedChat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteChat(req, res) {
        try {
            const chatId = req.params.chatId;
            const deletedChat = await this.chatServices.deleteChat(chatId);
            res.status(200).json({ message: "Chat deleted", deletedChat });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getChats(req, res) {
        try {
            const { senderId, receiverId } = req.query;
            const chats = await this.chatServices.getChats(senderId, receiverId);
            res.status(200).json(chats);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
