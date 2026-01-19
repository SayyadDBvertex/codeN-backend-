// import express from 'express';
// import {
//   changePassword,
//   editProfileOfUser,
//   forgetPassword,
//   getSlugByQuery,
//   getUserData,
//   login,
//   loginByGoogle,
//   register,
//   resendOtp,
//   verifyEmail,
//   getSubjectsByUser,
//   getAllsubjects,
//   getSubSubjectsBySubject,
//   getMcqsByChapter, submitTest,
//   postRating
// } from '../../controllers/user/userController.js';
// import uploadProfile from '../../middleware/uploaduserProfile.js';
// import { protect } from '../../middleware/authMiddleware.js';

// const userRouter = express.Router();

// /*register by google */
// userRouter.post('/google-login', loginByGoogle);

// /*register mannual */
// userRouter.post('/verify-email', verifyEmail);
// userRouter.post('/resend-otp', resendOtp);
// userRouter.post('/register', register);
// userRouter.post('/login', login);

// /*  user details api */
// userRouter.patch(
//   '/edit',
//   protect,
//   uploadProfile.single('image'),
//   editProfileOfUser
// );

// /*forgot password */
// userRouter.post('/forget-password', forgetPassword);
// userRouter.post('/change-password', changePassword);

// /* get slug api privacy policy term condition about us */
// userRouter.get('/slug', getSlugByQuery);


// userRouter.get('/get-subjects', getSubjectsByUser);
// userRouter.get('/get-all-subjects', getAllsubjects);

// userRouter.get('/get-sub-subjects', getSubSubjectsBySubject);
// userRouter.post('/rating', protect, postRating);
// userRouter.get('/get-mcqs', getMcqsByChapter);
// userRouter.post('/submit-test', submitTest);

// userRouter.get('/:id', protect, getUserData);


// export default userRouter;


import express from 'express';
import {
  changePassword,
  editProfileOfUser,
  forgetPassword,
  getSlugByQuery,
  getUserData,
  login,
  loginByGoogle,
  register,
  resendOtp,
  verifyEmail,
  getSubjectsByUser,
  getAllsubjects,
  getSubSubjectsBySubject,
  getMcqsByChapter,
  submitTest,
  postRating
} from '../../controllers/user/userController.js';
import uploadProfile from '../../middleware/uploaduserProfile.js';
import { protect } from '../../middleware/authMiddleware.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Authentication
 *   description: API for user registration, login and password management
 */

/**
 * @swagger
 * /api/users/google-login:
 *   post:
 *     summary: Login or Register via Google
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
userRouter.post('/google-login', loginByGoogle);

/**
 * @swagger
 * /api/users/verify-email:
 *   post:
 *     summary: Verify user email with OTP
 *     tags: [User Authentication]
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
 */
userRouter.post('/verify-email', verifyEmail);

userRouter.post('/resend-otp', resendOtp);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Manual user registration
 *     tags: [User Authentication]
 */
userRouter.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [User Authentication]
 */
userRouter.post('/login', login);

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: API for user profile management
 */

/**
 * @swagger
 * /api/users/edit:
 *   patch:
 *     summary: Update user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 */
userRouter.patch(
  '/edit',
  protect,
  uploadProfile.single('image'),
  editProfileOfUser
);

/**
 * @swagger
 * /api/users/forget-password:
 *   post:
 *     summary: Send OTP for forgotten password
 *     tags: [User Authentication]
 */
userRouter.post('/forget-password', forgetPassword);

userRouter.post('/change-password', changePassword);

/**
 * @swagger
 * /api/users/slug:
 *   get:
 *     summary: Get Privacy Policy, Terms, etc.
 *     tags: [Settings]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: privacy-policy, terms-condition, about-us
 */
userRouter.get('/slug', getSlugByQuery);

/**
 * @swagger
 * tags:
 *   name: Educational Content
 *   description: APIs for Subjects, MCQs, and Tests
 */

/**
 * @swagger
 * /api/users/get-subjects:
 *   get:
 *     summary: Get subjects by courseId
 *     tags: [Educational Content]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 */
userRouter.get('/get-subjects', getSubjectsByUser);

/**
 * @swagger
 * /api/users/get-all-subjects:
 *   get:
 *     summary: Get "All" category summary data
 *     tags: [Educational Content]
 */
userRouter.get('/get-all-subjects', getAllsubjects);

/**
 * @swagger
 * /api/users/get-sub-subjects:
 *   get:
 *     summary: Get sub-subjects by subjectId
 *     tags: [Educational Content]
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 */
userRouter.get('/get-sub-subjects', getSubSubjectsBySubject);

/**
 * @swagger
 * /api/users/rating:
 *   post:
 *     summary: Post a review/rating
 *     tags: [Engagement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 */
userRouter.post('/rating', protect, postRating);

/**
 * @swagger
 * /api/users/get-mcqs:
 *   get:
 *     summary: Get MCQs by chapterId
 *     tags: [Educational Content]
 *     parameters:
 *       - in: query
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: string
 */
userRouter.get('/get-mcqs', getMcqsByChapter);

/**
 * @swagger
 * /api/users/submit-test:
 *   post:
 *     summary: Submit test and get result
 *     tags: [Educational Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapterId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 */
userRouter.post('/submit-test', submitTest);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user data by ID
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
userRouter.get('/:id', protect, getUserData);

export default userRouter;