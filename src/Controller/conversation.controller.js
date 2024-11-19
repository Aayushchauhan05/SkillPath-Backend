const statusConstant = require("../constant/status.constant");
const ConversationServices = require("../Services/conversation.services");

module.exports = class ConversationController {
    constructor() {
        this.conversationService = new ConversationServices();
    }

    // Create a new conversation
    createConversation = async (request, response) => {
        console.log("Controller->conversation.controller.js->createConversation");

        try {
            const { userId } = request.query;
            console.log({ userId });

            const conversationData = request.body;
            const data = await this.conversationService.createConversation(userId, conversationData);
            console.log(data);
            response.status(statusConstant.created).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Conversation not created") {
                response.status(statusConstant.serverError).send({ message: "Conversation not created" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Get all conversations by user ID
    getConversationsByUser = async (request, response) => {
        console.log("Controller->conversation.controller.js->getConversationsByUser");

        try {
            const { user_id } = request.params;
            const data = await this.conversationService.getConversationsByUserId(user_id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "No conversations found") {
                response.status(statusConstant.notFound).send({ message: "No conversations found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Get conversation details by ID
    getConversationById = async (request, response) => {
        console.log("Controller->conversation.controller.js->getConversationById");

        try {
            const { conversationId } = request.params;
            const data = await this.conversationService.getConversationById(conversationId);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Conversation not found") {
                response.status(statusConstant.notFound).send({ message: "Conversation not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Add a conversation to a user
    addConversationToUser = async (request, response) => {
        console.log("Controller->conversation.controller.js->addConversationToUser");

        try {
            const { user_id, conversation_id } = request.body;
            const data = await this.conversationService.addConversationToUser(user_id, conversation_id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Conversation not added") {
                response.status(statusConstant.serverError).send({ message: "Conversation not added" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Delete a conversation
    deleteConversation = async (request, response) => {
        console.log("Controller->conversation.controller.js->deleteConversation");

        try {
            const { conversationId } = request.params;
            const data = await this.conversationService.deleteConversation(conversationId);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Conversation not found") {
                response.status(statusConstant.notFound).send({ message: "Conversation not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }
};
