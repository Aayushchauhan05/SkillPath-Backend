
const PaymentWebhook = require("../Entities/paymentWebHook.entities");

module.exports = class PaymentWebhookDao {
    constructor() {
        this.WebhookModel = PaymentWebhook;
    }

    async createWebhookEvent(data) {
        return await this.WebhookModel.create(data);
    }

    async getWebhookEventById(eventId) {
        return await this.WebhookModel.findById(eventId);
    }

    async getAllWebhookEvents() {
        return await this.WebhookModel.find({});
    }
}
