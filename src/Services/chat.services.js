const ChatDao = require("../Dao/chat.dao");

module.exports = class ChatServices {
    constructor() {
        this.chatDao = new ChatDao();
    }

    async createChat(body) {
        if (!body || !body.senderId || !body.receiverId || !body.message) {
            throw new Error('Invalid data for creating a chat');
        }
        console.log(body)
        const chat = await this.chatDao.createChat(body);
        if (!chat) {
            throw new Error('Chat creation failed');
        }
        return chat;
    }

    async updateChat(chatId, update) {
        if (!chatId || !update) {
            throw new Error('Chat ID and update data are required');
        }
        const updatedChat = await this.chatDao.updateChat(chatId, update);
        if (!updatedChat) {
            throw new Error('Chat update failed or chat not found');
        }
        return updatedChat;
    }

    async deleteChat(chatId) {
        if (!chatId) {
            throw new Error('Chat ID is required');
        }
        const deletedChat = await this.chatDao.deleteChat(chatId);
        if (!deletedChat) {
            throw new Error('Chat deletion failed or chat not found');
        }
        return deletedChat;
    }

    async getChats(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error('Both senderId and receiverId are required');
        }
        const chats = await this.chatDao.getChats(senderId, receiverId);
        if (!chats || chats.length === 0) {
            throw new Error('No chats found between the provided users');
        }
        return chats;
    }
};
