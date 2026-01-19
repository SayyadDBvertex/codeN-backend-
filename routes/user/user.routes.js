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
  getAllTopicsForUser,
  getTopicsByChapterForUser,
  getSingleTopicForUser,
  getTopicsWithChaptersForUser,
} from '../../controllers/user/userController.js';

import uploadProfile from '../../middleware/uploaduserProfile.js';
import { protect } from '../../middleware/authMiddleware.js';
import { testLimiter, otpLimiter } from '../../middleware/limiter.js';

import {
  getChapterVideoByChapterId,
  getVideoData,
} from '../../controllers/admin/Video/video.controller.js';

const userRouter = express.Router();

/* ================= AUTH ================= */

// Google login
userRouter.post('/google', otpLimiter, loginByGoogle);

// Email registration flow
userRouter.post('/register', otpLimiter, register);
userRouter.post('/verify-email', otpLimiter, verifyEmail);
userRouter.post('/resend-otp', otpLimiter, resendOtp);
userRouter.post('/login', otpLimiter, login);

// Password recovery
userRouter.post('/forgot-password', otpLimiter, forgetPassword);
userRouter.post('/change-password', otpLimiter, changePassword);

/* ================= USER ================= */

// Video APIs
userRouter.get('/video/:videoId', getVideoData);
userRouter.get('/chapter/:chapterId/video', getChapterVideoByChapterId);

// Profile update
userRouter.patch(
  '/profile',
  protect,
  uploadProfile.single('image'),
  editProfileOfUser
);

// Get logged-in user data (secure)
userRouter.get('/profile/:id', protect, getUserData);

/* ================= CMS / STATIC ================= */

// Slug pages (privacy, terms, about)
userRouter.get('/slug', getSlugByQuery);

/* ================= SUBJECT / SUB-SUBJECT ================= */

userRouter.get('/subjects', getSubjectsByUser);
userRouter.get('/get-all-subjects', getAllsubjects);
userRouter.get('/get-sub-subjects', getSubSubjectsBySubject);

/* ================= TOPIC / CHAPTER ================= */

userRouter.get(
  '/topics-with-chapters/sub-subject/:subSubjectId',
  getTopicsWithChaptersForUser
);

userRouter.get('/topics', getAllTopicsForUser);
userRouter.get('/topics/chapter/:chapterId', getTopicsByChapterForUser);
userRouter.get('/topics/:id', getSingleTopicForUser);

/* ================= MCQ / TEST ================= */

userRouter.get('/get-mcqs', getMcqsByChapter);
userRouter.post('/submit-test', testLimiter, submitTest);

export default userRouter;
