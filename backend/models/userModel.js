import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    cartData: { type: Object, default: {}},
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, {minimize: false, timestamps: true})     // minimize: false is used to save empty objects in the database

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;