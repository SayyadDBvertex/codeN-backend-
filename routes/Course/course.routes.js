// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createCourse,
//   getAllCourses,
//   getCourseById,
//   updateCourse,
//   deleteCourse,
//   toggleCourseStatus,
//   publishCourse,
//   unpublishCourse,
// } from '../../controllers/Course/course.controller.js';

// const router = express.Router();

// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// // Create course
// router.post('/', createCourse);

// // Get all courses
// router.get('/', getAllCourses);

// // Get single course
// router.get('/:id', getCourseById);

// // Update course
// router.patch('/:id', updateCourse);

// // Delete course (soft delete)
// router.delete('/:id', deleteCourse);

// // Toggle course status (enable/disable)
// router.patch('/:id/status', toggleCourseStatus);

// // Publish course
// router.patch('/:id/publish', publishCourse);

// // Unpublish course
// router.patch('/:id/unpublish', unpublishCourse);

// export default router;



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

/**
 * @swagger
 * tags:
 *   name: Admin - Courses
 *   description: Course management APIs (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Full Stack Web Development"
 *               description:
 *                 type: string
 *                 example: "Learn MERN stack from scratch"
 *               price:
 *                 type: number
 *                 example: 4999
 *               duration:
 *                 type: string
 *                 example: "6 Months"
 *     responses:
 *       201:
 *         description: Course created successfully
 *   get:
 *     summary: Get all courses
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all courses fetched
 */
router.post('/', createCourse);
router.get('/', getAllCourses);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   get:
 *     summary: Get single course by ID
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Course ID
 *     responses:
 *       200:
 *         description: Course details fetched
 *   patch:
 *     summary: Update course details
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *   delete:
 *     summary: Soft delete a course
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.get('/:id', getCourseById);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);

/**
 * @swagger
 * /api/admin/courses/{id}/status:
 *   patch:
 *     summary: Toggle course status (Enable/Disable)
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course status toggled
 */
router.patch('/:id/status', toggleCourseStatus);

/**
 * @swagger
 * /api/admin/courses/{id}/publish:
 *   patch:
 *     summary: Publish the course
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course published successfully
 */
router.patch('/:id/publish', publishCourse);

/**
 * @swagger
 * /api/admin/courses/{id}/unpublish:
 *   patch:
 *     summary: Unpublish the course
 *     tags: [Admin - Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course unpublished successfully
 */
router.patch('/:id/unpublish', unpublishCourse);

export default router;