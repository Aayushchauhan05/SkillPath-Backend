const express = require("express");
const ChatController = require("../Controller/chat.controller");
const { CREATE_CHAT, UPDATE_CHAT, DELETE_CHAT, GET_CHATS } = require("../constant/chat.constant");

const router = express.Router();
const chatController = new ChatController();

router.post(CREATE_CHAT, chatController.createChat);
router.put(UPDATE_CHAT, chatController.updateChat);
router.delete(DELETE_CHAT, chatController.deleteChat);
router.get(GET_CHATS, chatController.getChats);

module.exports = router;
