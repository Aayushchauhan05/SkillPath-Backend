const conversationDao = require("../Dao/conversation.dao");

module.exports = class ConversationServices {
    constructor() {
        this.conversationDao = new conversationDao();
    }

    async createConversation(userId, conversationData) {
        const newConversation = await this.conversationDao.createConversation({
            userId,
            ...conversationData
        });

        return {
            message: "Conversation created successfully",
            conversation: newConversation,
        };
    }

    async getConversationsByUserId(userId) {
        const conversations = await this.conversationDao.getConversations(userId);
        if (!conversations) {
            throw new Error("No conversations found");
        }
        return conversations;
    }

    async addConversationToUser(userId, conversationId) {
        const updatedConversation = await this.conversationDao.addConversation(userId, conversationId);
        if (!updatedConversation) {
            throw new Error("Conversation not added");
        }
        return updatedConversation;
    }

    async getConversationById(conversationId) {
        const conversation = await this.conversationDao.getConversationById(conversationId);
        if (!conversation) {
            throw new Error("Conversation not found");
        }
        return conversation;
    }

    async deleteConversation(conversationId) {
        const deletedConversation = await this.conversationDao.deleteConversation(conversationId);
        if (!deletedConversation) {
            throw new Error("Conversation not found");
        }
        return {
            message: "Conversation deleted successfully"
        };
    }
};
