const express = require("express");
const ConversationController = require("../Controller/conversation.controller");
const {
    CREATE_CONVERSATION,
    GET_CONVERSATION,
    GET_CONVERSATIONS_BY_USER,
    ADD_CONVERSATION_TO_USER
} = require("../constant/conversation.constant");

const route = express.Router();
const conversationController = new ConversationController();

route.post(CREATE_CONVERSATION, conversationController.createConversation);
route.get(GET_CONVERSATION, conversationController.getConversationById);
route.get(GET_CONVERSATIONS_BY_USER, conversationController.getConversationsByUser);
route.put(ADD_CONVERSATION_TO_USER, conversationController.addConversationToUser);

module.exports = route;
