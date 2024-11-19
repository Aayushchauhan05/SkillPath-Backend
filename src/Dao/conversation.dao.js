const conversation = require("../Entities/conversation.entities");

module.exports = class ConversationDao {
    constructor() {
        this.model = conversation;
    }

    async createConversation(body) {
        return this.model.create(body);
    }
    async findConversation(query) {
        return await this.model.findOne(query);
    }
    async upsertConversation({ userId, conversation }) {
        return this.model.updateOne(
          { userId }, 
          { $addToSet: { conversation: { $each: conversation } } }, 
          { upsert: true } 
        );
      }

    async updateConversation(conversationId, update) {
        return this.model.findByIdAndUpdate(conversationId, update, { new: true });
    }

    async deleteConversation(conversationId) {
        return this.model.findByIdAndDelete(conversationId);
    }

    async getConversations(userId) {
        return this.model
            .find({ userId })
            .populate("userId")
            .populate("conversations");
    }

    async getConversationById(conversationId) {
        return this.model
            .findById(conversationId)
            .populate("userId")
            .populate("conversations");
    }

    async addConversation(userId, conversationId) {
        return this.model.findOneAndUpdate(
            { userId },
            { $push: { conversations: conversationId } },
            { new: true }
        )
        .populate("userId")
        .populate("conversations");
    }
};
