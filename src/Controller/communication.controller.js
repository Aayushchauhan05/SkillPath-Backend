const CommunicationServices = require("../Services/communication.services");

module.exports = class CommunicationController {
    constructor() {
        this.communicationServices = new CommunicationServices();
    }

    async createCommunication(req, res) {
        try {
            const communication = await this.communicationServices.createCommunication(req.body);
            res.status(201).json(communication);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCommunication(req, res) {
        try {
            const communicationId = req.params.communicationId;
            const updatedCommunication = await this.communicationServices.updateCommunication(communicationId, req.body);
            res.status(200).json(updatedCommunication);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCommunication(req, res) {
        try {
            const communicationId = req.params.communicationId;
            const deletedCommunication = await this.communicationServices.deleteCommunication(communicationId);
            res.status(200).json({ message: "Communication deleted", deletedCommunication });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getCommunicationByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const communication = await this.communicationServices.getCommunicationByUserId(userId);
            res.status(200).json(communication);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
