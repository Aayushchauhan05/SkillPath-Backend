const express = require("express");
const CommunicationController = require("../Controller/communication.controller");
const {
    CREATE_COMMUNICATION,
    UPDATE_COMMUNICATION,
    DELETE_COMMUNICATION,
    GET_COMMUNICATION_BY_USER_ID
} = require("../constant/communication.constant");

const router = express.Router();
const communicationController = new CommunicationController();

router.post(CREATE_COMMUNICATION, communicationController.createCommunication);
router.put(UPDATE_COMMUNICATION, communicationController.updateCommunication);
router.delete(DELETE_COMMUNICATION, communicationController.deleteCommunication);
router.get(GET_COMMUNICATION_BY_USER_ID, communicationController.getCommunicationByUserId);

module.exports = router;
