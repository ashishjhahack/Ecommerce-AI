import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)    // .sign is used to create a token

}

const register = async (req, res) => {
    
    try {
        const {name, email, password} = req.body;

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: 'User already exist'})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please enter valid email'})
        }
        if(password.length < 8){
            return res.json({success: false, message: 'password length should be greater than 8 characters'})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email, 
            password: hashedPassword
        })
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success: true, token})
        }
        else{
            res.json({success: false, message: 'Invalid Credentials'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");       // this is for generating a unique token
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		res.status(200).json({ success: true, message: "Now you can reset your password" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await userModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Route for admin login 
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);    // generate a token and send this to admin user
            res.json({success: true, token})
        }
        else{
            res.json({success: false, message: "Invalid Credentials"});
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }

}

export { register, login, adminLogin, forgotPassword, resetPassword };