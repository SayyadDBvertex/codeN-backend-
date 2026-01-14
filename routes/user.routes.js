import express from 'express';
import { login, loginByGoogle, register, resendOtp, verifyEmail } from '../controllers/userController.js';

const userRouter = express.Router();

/*register by google */
userRouter.post('/google-login',loginByGoogle)

/*register mannual */
userRouter.post('/verify-email',verifyEmail)
userRouter.post('/resend-otp',resendOtp)
userRouter.post('/register',register)
userRouter.post('/login',login)


export default userRouter;