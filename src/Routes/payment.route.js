// routes/payment.routes.js

const express = require('express');
const PaymentController = require('../Controller/payment.controller');

const router = express.Router();
const paymentController = new PaymentController();

router.post('/setup-razorpay', paymentController.createRazorpayCustomer);
router.post('/create-order', paymentController.createOrder);
router.post('/capture-payment', paymentController.capturePayment);
router.post('/webhook', paymentController.handleWebhook);
router.get('/transactions/:userId', paymentController.getUserTransactions);

module.exports = router;
