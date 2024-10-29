
const mongoose = require('mongoose');

const PaymentWebhookSchema = new mongoose.Schema({
    event: { 
        type: String, 
        required: true 
    },
    payload: { 
        type: Object,
        required: true 
    },
    processed: { 
        type: Boolean, 
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('PaymentWebhook', PaymentWebhookSchema);
