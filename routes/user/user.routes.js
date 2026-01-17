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
} from '../../controllers/user/userController.js';
import uploadProfile from '../../middleware/uploaduserProfile.js';
import { protect } from '../../middleware/authMiddleware.js';
import { getAllSubjects } from '../../controllers/admin/Subject/subject.controller.js';
import {  getSubSubjectsById } from '../../controllers/admin/Sub-subject/subSubject.controller.js';
import { getChapterBySubSubjectId } from '../../controllers/admin/Chapter/chapter.controller.js';
import { getChapterVideoByChapterId, getVideoData } from '../../controllers/admin/Video/video.controller.js';
const userRouter = express.Router();

/*register by google */
userRouter.post('/google-login', loginByGoogle);

/*register mannual */
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/register', register);
userRouter.post('/login', login);

/*========================video get api================== */
userRouter.get('/video/:videoId', getVideoData);
userRouter.get('/chapter/:chapterId/video', getChapterVideoByChapterId);
userRouter.get('/sub-subject/:subSubjectId/chapter', getChapterBySubSubjectId);
userRouter.get('/subject/:subjectId/sub-subject', getSubSubjectsById);
userRouter.get('/subjects', getAllSubjects);

/*  user details api */
userRouter.patch(
  '/edit',
  protect,
  uploadProfile.single('image'),
  editProfileOfUser
);
userRouter.get('/:id', protect, getUserData);

/*forgot password */
userRouter.post('/forget-password', forgetPassword);
userRouter.post('/change-password', changePassword);

/* get slug api privacy policy term condition about us */
userRouter.get('/slug', getSlugByQuery);




export default userRouter;
