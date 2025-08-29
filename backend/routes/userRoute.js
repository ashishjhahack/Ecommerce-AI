import express from 'express';
import {register, login, adminLogin, forgotPassword, resetPassword} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login);
userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password/:token", resetPassword);
userRouter.post('/admin', adminLogin)

export default userRouter;