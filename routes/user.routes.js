// import express from 'express';
// import { changePassword,rating, forgetPassword, getSlugByQuery, login, loginByGoogle, register, resendOtp, verifyEmail } from '../controllers/userController.js';

// const userRouter = express.Router();

// /**
//  * @swagger
//  * /api/user/register:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [User]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Invalid input
//  */
// userRouter.post('/register', register);

// /**
//  * @swagger
//  * /api/user/login:
//  *   post:
//  *     summary: User Login
//  *     tags: [User]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login successful
//  */

// /*register by google */
// userRouter.post('/google-login',loginByGoogle)

// /*register mannual */
// userRouter.post('/verify-email',verifyEmail)
// userRouter.post('/resend-otp',resendOtp)
// userRouter.post('/register',register)
// userRouter.post('/login',login)

// /*forgot password */
// userRouter.post('/forget-password',forgetPassword)
// userRouter.post('/change-password',changePassword)


// /* get slug api privacy policy term condition about us */
// userRouter.get('/slug',getSlugByQuery)

// userRouter.post('/submit-rating', rating)

// export default userRouter;



import express from 'express';
import { 
    changePassword, 
    rating, 
    forgetPassword, 
    getSlugByQuery, 
    login, 
    loginByGoogle, 
    register, 
    resendOtp, 
    verifyEmail 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Routes APIs
 */

/**
 * @swagger
 * /api/user/google-login:
 *   post:
 *     summary: Register or Login via Google
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in via Google
 */
userRouter.post('/google-login', loginByGoogle);

/**
 * @swagger
 * /api/user/verify-email:
 *   post:
 *     summary: Verify user email using OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
userRouter.post('/verify-email', verifyEmail);

/**
 * @swagger
 * /api/user/resend-otp:
 *   post:
 *     summary: Resend OTP to user email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
userRouter.post('/resend-otp', resendOtp);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user manually
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
userRouter.post('/register', register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User Login (Manual)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
userRouter.post('/login', login);

/**
 * @swagger
 * /api/user/forget-password:
 *   post:
 *     summary: Send password reset link/OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset info sent to email
 */
userRouter.post('/forget-password', forgetPassword);

/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
userRouter.post('/change-password', changePassword);

/**
 * @swagger
 * /api/user/slug:
 *   get:
 *     summary: Get content by slug (Privacy Policy, Terms, etc.)
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type of slug (e.g., privacy-policy, terms)
 *     responses:
 *       200:
 *         description: Data fetched successfully
 */
userRouter.get('/slug', getSlugByQuery);

/**
 * @swagger
 * /api/user/submit-rating/{id}:
 *   post:
 *     summary: Submit a rating for a particular user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (Paste your ID here)
 *         example: 6968aba2b339e83b103447a0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: "Excellent service!"
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.post('/submit-rating/:id' , rating);   // Ensure here is :id
export default userRouter;