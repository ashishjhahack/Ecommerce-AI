import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router();


// admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)


// payment features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User feature
orderRouter.post('/userorders', authUser, userOrders);

// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)


export default orderRouter;