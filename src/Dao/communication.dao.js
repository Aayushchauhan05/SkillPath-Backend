const Communication = require("../Entities/communication.entities");

module.exports = class CommunicationDao {
    constructor() {
        this.model = Communication;
    }

    async createCommunication(body) {
        return this.model.create(body);
    }

    async updateCommunication(communicationId, update) {
        return this.model.findByIdAndUpdate(communicationId, update, { new: true });
    }

    async deleteCommunication(communicationId) {
        return this.model.findByIdAndDelete(communicationId);
    }

    async getCommunicationByUserId(userId) {
        return this.model.findOne({ userId }).populate("communication");
    }
};
