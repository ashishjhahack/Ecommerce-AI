
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'usd'
const deliveryCharge = 0.12
const currencyRazorpay = 'INR'     // in razorpay this have to be on uppercase
const deliveryChargeRazorpay = 10

// getaway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing order using CashOnDeleivery mtd
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;     // getting userId from atuh.js

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}})    // When we place the order then clear the cart

        res.json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing order using stripe mtd
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;
        const { origin } = req.headers;      // getting origin from headers this is the frontend url

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,   // if payment is success then go to this url
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const {orderId, success, userId} =req.body;
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({ success: true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);    
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing order using razorpay mtd
const placeOrderRazorpay = async(req, res) => {
    try{
        const { userId, items, amount, address} = req.body;     // getting userId from atuh.js

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency: currencyRazorpay,
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({success: false, message: error})
            }
            console.log(order)
            res.json({success: true, order})
        })

        // 3️⃣ Await order creation
        // const order = await razorpayInstance.orders.create(options);

        // console.log(orders)

        // 4️⃣ Send success response
        // res.json({ success: true, order });
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// veirfy razorpay 
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;     // get razorpay_order_id from frontend

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})     // it will clear the user cartData
            res.json({success: true, message: 'Payment Successful'})
        }
        else{
            res.json({success: false, message: 'Paymentb failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});      // only find b/c of finding multiple products
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// User Order data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// update orders status only for admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: 'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay}