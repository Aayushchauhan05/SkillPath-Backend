
const PaymentDao = require("../Dao/payment.dao");
const PaymentTransactionDao = require("../Dao/transaction.dao");
const PaymentWebhookDao = require("../Dao/paymentWebhook.dao");
const Razorpay = require("razorpay");
require('dotenv').config();
module.exports = class PaymentServices {
    constructor() {
        this.RazorDao = new PaymentDao();
        this.TransactionDao = new PaymentTransactionDao();
        this.WebhookDao = new PaymentWebhookDao();
        this.razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }

    async createRazorpayCustomer(userData) {
        const { name, email, phone } = userData;

        try {
            const customer = await this.razorpayInstance.customers.create({
                name: name,
                email: email,
                contact: phone,
            });

            await this.RazorDao.createRazorUser({ ...userData, razorpayCustomerId: customer.id });
            return customer.id;
        } catch (error) {
            throw new Error("Error creating Razorpay customer");
        }
    }

    async createOrder(amount, currency, userId) {
        if (!amount || amount <= 0) {
            throw new Error("Invalid amount");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }

        const orderOptions = {
            amount: amount * 100,
            currency: currency,
            receipt: `receipt#${Math.random() * 10000}`,
            payment_capture: 1,
        };

        try {
            const order = await this.razorpayInstance.orders.create(orderOptions);
            await this.TransactionDao.createTransaction({
                userId,
                amount,
                razorpayOrderId: order.id,
                status: 'pending',
            });
            return order;
        } catch (error) {
            throw new Error("Error creating order");
        }
    }

    async capturePayment(paymentId, orderId) {
        if (!paymentId || !orderId) {
            throw new Error("Payment ID and Order ID are required");
        }

        try {
            const captureOptions = {
                amount: 100,
                currency: 'INR',
            };

            const capturedPayment = await this.razorpayInstance.payments.capture(paymentId, captureOptions.amount, captureOptions.currency);
            await this.TransactionDao.updateTransaction(orderId, {
                status: 'completed',
            });
            return capturedPayment;
        } catch (error) {
            throw new Error("Error capturing payment");
        }
    }

    async handleWebhook(eventData, signature) {
        if (!eventData.event) {
            throw new Error("Invalid event data");
        }

      
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(eventData.id + '|' + JSON.stringify(eventData.payload))
            .digest('hex');

        if (generatedSignature !== signature) {
            throw new Error("Invalid signature");
        }

        try {
            await this.WebhookDao.createWebhookEvent({
                event: eventData.event,
                payload: eventData,
                processed: false,
            });

            switch (eventData.event) {
                case 'payment.captured':
                    const transaction = await this.TransactionDao.getTransactionById(eventData.payload.razorpay_order_id);
                    await this.TransactionDao.updateTransaction(transaction._id, { status: 'completed' });
                    break;
                case 'payment.failed':
                    const failedTransaction = await this.TransactionDao.getTransactionById(eventData.payload.razorpay_order_id);
                    await this.TransactionDao.updateTransaction(failedTransaction._id, { status: 'failed' });
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw new Error("Error handling webhook event");
        }
    }
    async getUserTransactions(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        try {
            return await this.TransactionDao.getUserTransactions(userId);
        } catch (error) {
            throw new Error("Error fetching user transactions");
        }
    }
}
