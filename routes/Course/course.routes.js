import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
  publishCourse,
  unpublishCourse,
} from '../../controllers/Course/course.controller.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Create course
router.post('/', createCourse);

// Get all courses
router.get('/', getAllCourses);

// Get single course
router.get('/:id', getCourseById);

// Update course
router.patch('/:id', updateCourse);

// Delete course (soft delete)
router.delete('/:id', deleteCourse);

// Toggle course status (enable/disable)
router.patch('/:id/status', toggleCourseStatus);

// Publish course
router.patch('/:id/publish', publishCourse);

// Unpublish course
router.patch('/:id/unpublish', unpublishCourse);

export default router;
