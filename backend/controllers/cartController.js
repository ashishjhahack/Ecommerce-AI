import userModel from "../models/userModel.js";

const addtoCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;     // userId we get auth.js 

        const userData = await userModel.findById(userId);       
        let cartData = await userData.cartData;         // create a new cartData entry

        if(cartData[itemId]){   // if itemId already exist in cart
            if(cartData[itemId][size]){
                cartData[itemId][size] ++;
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{    // if itemId not exist in cart then we create a new object and add size to it
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findOneAndUpdate({ _id: userId }, {cartData})

        res.json({success: true, message: 'Added to Cart'})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findOneAndUpdate({ _id: userId }, {cartData})
        res.json({success: true, message: 'Cart Updated'})       
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {addtoCart, updateCart, getUserCart}