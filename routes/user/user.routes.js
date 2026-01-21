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
//   getMcqsByChapter,
//   submitTest,
//   getActivePlans,
//   getMySubscription,
//   buySubscription,
//   postRating,
//   getAllSubSubjectsForUser,
// } from '../../controllers/user/userController.js';
// import { getAboutUs } from '../../controllers/admin/AboutUs/aboutus.controller.js';
// import { getPrivacyPolicy } from '../../controllers/admin/PrivacyPolicy/privacy.controller.js';
// import { getTerms } from '../../controllers/admin/Terms&Condition/terms.controller.js';
// import { getChapterBySubSubjectId } from '../../controllers/admin/Chapter/chapter.controller.js';

// import uploadProfile from '../../middleware/uploaduserProfile.js';
// import { protect } from '../../middleware/authMiddleware.js';

// import {
//   getChapterVideoByChapterId,
//   getVideoData,
// } from '../../controllers/admin/Video/video.controller.js';
// import {
//   getAllTopicsForUser,
//   getTopicsByChapterForUser,
//   getSingleTopicForUser,
//   getTopicsWithChaptersForUser,
// } from '../../controllers/user/userController.js';

// import { testLimiter, otpLimiter } from '../../middleware/limiter.js';



// const userRouter = express.Router();

// /* ================= AUTH ================= */

// // Google login
// userRouter.post('/google', otpLimiter, loginByGoogle);

// // Email registration flow
// userRouter.post('/register', otpLimiter, register);
// userRouter.post('/verify-email', otpLimiter, verifyEmail);
// userRouter.post('/resend-otp', otpLimiter, resendOtp);
// userRouter.post('/login', otpLimiter, login);

// // Password recovery
// userRouter.post('/forgot-password', otpLimiter, forgetPassword);
// userRouter.post('/change-password', otpLimiter, changePassword);

// /* ================= USER ================= */

// // Video APIs
// userRouter.get('/video/:videoId', getVideoData);
// userRouter.get('/chapter/:chapterId/video', getChapterVideoByChapterId);

// // Profile update
// userRouter.patch(
//   '/profile',
//   protect,
//   uploadProfile.single('image'),
//   editProfileOfUser
// );

// // Get logged-in user data (secure)

// /* ================= CMS / STATIC ================= */

// // Slug pages (privacy, terms, about)
// userRouter.get('/slug', getSlugByQuery);

// /* ================= SUBJECT / SUB-SUBJECT ================= */

// userRouter.get('/subjects', getSubjectsByUser);
// userRouter.get('/get-all-subjects', getAllsubjects);
// userRouter.get('/get-sub-subjects', getSubSubjectsBySubject);

// /* ================= TOPIC / CHAPTER ================= */

// userRouter.get(
//   '/topics-with-chapters/sub-subject/:subSubjectId',
//   getTopicsWithChaptersForUser
// );

// userRouter.get('/topics', getAllTopicsForUser);
// userRouter.get('/topics/chapter/:chapterId', getTopicsByChapterForUser);
// userRouter.get('/topics/:id', getSingleTopicForUser);
// userRouter.get("/get-chapters/:subSubjectId", getChapterBySubSubjectId);



// /* ================= MCQ / TEST ================= */

// userRouter.get('/get-mcqs', getMcqsByChapter);
// userRouter.post('/submit-test', testLimiter, submitTest);

// userRouter.get('/get-plans', getActivePlans);
// userRouter.get('/my-subscription', protect, getMySubscription);
// userRouter.post('/buy-plan', protect, buySubscription);
// userRouter.get('/about-us', getAboutUs);
// userRouter.get('/privacy-policy', getPrivacyPolicy);
// userRouter.get('/terms-conditions', getTerms);
// userRouter.get('/:id', protect, getUserData);
// userRouter.get('/profile/:id', protect, getUserData);

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
  getActivePlans,
  getMySubscription,
  buySubscription,
  postRating,
} from '../../controllers/user/userController.js';

import { getAboutUs } from '../../controllers/admin/AboutUs/aboutus.controller.js';
import { getPrivacyPolicy } from '../../controllers/admin/PrivacyPolicy/privacy.controller.js';
import { getTerms } from '../../controllers/admin/Terms&Condition/terms.controller.js';
import { getChapterBySubSubjectId } from '../../controllers/admin/Chapter/chapter.controller.js';

import uploadProfile from '../../middleware/uploaduserProfile.js';
import { protect } from '../../middleware/authMiddleware.js';

import {
  getChapterVideoByChapterId,
  getVideoData,
} from '../../controllers/admin/Video/video.controller.js';

import {
  getAllTopicsForUser,
  getTopicsByChapterForUser,
  getSingleTopicForUser,
  getTopicsWithChaptersForUser,
} from '../../controllers/user/userController.js';

import { testLimiter, otpLimiter } from '../../middleware/limiter.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User Authentication
 *     description: Registration, Login, and Password management
 *   - name: User Profile
 *     description: User details and profile updates
 *   - name: Educational Content
 *     description: Subjects, Sub-subjects, Topics, and Chapters
 *   - name: MCQs & Tests
 *     description: Practice questions and test submissions
 *   - name: Videos
 *     description: Video lectures and related data
 *   - name: Subscription & Plans
 *     description: Management of user plans and purchases
 *   - name: CMS & Settings
 *     description: About us, Privacy, and Terms
 */

/* ================= AUTH ROUTES ================= */

/**
 * @swagger
 * /api/users/google:
 *   post:
 *     summary: Google Login/Registration
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access_token:
 *                 type: string
 */
userRouter.post('/google', otpLimiter, loginByGoogle);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Manual Registration
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, countryId, stateId, cityId, collegeId, classId]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               mobile: { type: string }
 *               address: { type: string }
 *               countryId: { type: string }
 *               stateId: { type: string }
 *               cityId: { type: string }
 *               collegeId: { type: string }
 *               classId: { type: string }
 *               admissionYear: { type: string }
 */
userRouter.post('/register', otpLimiter, register);

/**
 * @swagger
 * /api/users/verify-email:
 *   post:
 *     summary: Verify Email with OTP
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               otp: { type: string }
 */
userRouter.post('/verify-email', otpLimiter, verifyEmail);

userRouter.post('/resend-otp', otpLimiter, resendOtp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User Login
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 */
userRouter.post('/login', otpLimiter, login);

userRouter.post('/forgot-password', otpLimiter, forgetPassword);
userRouter.post('/change-password', otpLimiter, changePassword);

/* ================= VIDEO ROUTES ================= */

/**
 * @swagger
 * /api/users/video/{videoId}:
 *   get:
 *     summary: Get specific video data
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema: { type: string }
 */
userRouter.get('/video/:videoId', getVideoData);

userRouter.get('/chapter/:chapterId/video', getChapterVideoByChapterId);

/* ================= PROFILE ROUTES ================= */

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update User Profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               image: { type: string, format: binary }
 */
userRouter.patch(
  '/profile',
  protect,
  uploadProfile.single('image'),
  editProfileOfUser
);

/* ================= CMS / STATIC ================= */

userRouter.get('/slug', getSlugByQuery);
userRouter.get('/about-us', getAboutUs);
userRouter.get('/privacy-policy', getPrivacyPolicy);
userRouter.get('/terms-conditions', getTerms);

/* ================= EDUCATIONAL CONTENT ================= */

/**
 * @swagger
 * /api/users/subjects:
 *   get:
 *     summary: Get subjects by courseId
 *     tags: [Educational Content]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema: { type: string }
 */
userRouter.get('/subjects', getSubjectsByUser);

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
 *         schema: { type: string }
 */
userRouter.get('/get-sub-subjects', getSubSubjectsBySubject);

userRouter.get(
  '/topics-with-chapters/sub-subject/:subSubjectId',
  getTopicsWithChaptersForUser
);

userRouter.get('/topics', getAllTopicsForUser);
userRouter.get('/topics/chapter/:chapterId', getTopicsByChapterForUser);
userRouter.get('/topics/:id', getSingleTopicForUser);
userRouter.get("/get-chapters/:subSubjectId", getChapterBySubSubjectId);

/* ================= MCQs & TESTS ================= */

/**
 * @swagger
 * /api/users/get-mcqs:
 *   get:
 *     summary: Get MCQs by chapterId
 *     tags: [MCQs & Tests]
 *     parameters:
 *       - in: query
 *         name: chapterId
 *         required: true
 *         schema: { type: string }
 */
userRouter.get('/get-mcqs', getMcqsByChapter);

/**
 * @swagger
 * /api/users/submit-test:
 *   post:
 *     summary: Submit a test and get results
 *     tags: [MCQs & Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapterId: { type: string }
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 */
userRouter.post('/submit-test', testLimiter, submitTest);

/* ================= SUBSCRIPTION ROUTES ================= */

userRouter.get('/get-plans', getActivePlans);

/**
 * @swagger
 * /api/users/my-subscription:
 *   get:
 *     summary: Get logged-in user subscription
 *     tags: [Subscription & Plans]
 *     security:
 *       - bearerAuth: []
 */
userRouter.get('/my-subscription', protect, getMySubscription);

userRouter.post('/buy-plan', protect, buySubscription);

/* ================= DATA FETCH BY ID ================= */

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
 *         schema: { type: string }
 */
userRouter.get('/:id', protect, getUserData);
userRouter.get('/profile/:id', protect, getUserData);

export default userRouter;