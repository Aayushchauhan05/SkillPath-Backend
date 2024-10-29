
const RazorPayUser = require("../Entities/razorPay.entities");

module.exports = class PaymentDao {
    constructor() {
        this.RazorModel = RazorPayUser;
    }

    async createRazorUser(data) {
        return await this.RazorModel.create(data);
    }

    async getRazorUserById(userId) {
        return await this.RazorModel.findById(userId);
    }

    async updateRazorUser(userId, updateData) {
        return await this.RazorModel.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteRazorUser(userId) {
        return await this.RazorModel.findByIdAndDelete(userId);
    }

    async getAllRazorUsers() {
        return await this.RazorModel.find({});
    }
}
