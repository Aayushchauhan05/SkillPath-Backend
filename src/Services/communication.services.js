const CommunicationDao = require("../Dao/communication.dao");

module.exports = class CommunicationServices {
    constructor() {
        this.communicationDao = new CommunicationDao();
    }

    async createCommunication(body) {
        if (!body || !body.userId || !body.communication) {
            throw new Error('Invalid data for creating communication');
        }
        return this.communicationDao.createCommunication(body);
    }

    async updateCommunication(communicationId, update) {
        if (!communicationId || !update) {
            throw new Error('Communication ID and update data are required');
        }
        return this.communicationDao.updateCommunication(communicationId, update);
    }

    async deleteCommunication(communicationId) {
        if (!communicationId) {
            throw new Error('Communication ID is required');
        }
        return this.communicationDao.deleteCommunication(communicationId);
    }

    async getCommunicationByUserId(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.communicationDao.getCommunicationByUserId(userId);
    }
};
