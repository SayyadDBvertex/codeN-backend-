// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createSubject,
//   getAllSubjects,
//   getSubjectById,
//   updateSubject,
//   deleteSubject,
//   toggleSubjectStatus,
// } from '../../controllers/Subject/subject.controller.js';

// const router = express.Router();

// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// // Create subject
// router.post('/', createSubject);

// // Get all subjects
// router.get('/', getAllSubjects);

// // Get single subject
// router.get('/:id', getSubjectById);

// // Update subject
// router.patch('/:id', updateSubject);

// // Delete subject (soft delete)
// router.delete('/:id', deleteSubject);

// // Toggle subject status (enable/disable)
// router.patch('/:id/status', toggleSubjectStatus);

// export default router;



import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  toggleSubjectStatus,
} from '../../controllers/Subject/subject.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Subjects
 *   description: Subject management APIs (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Admin - Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - courseId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *               courseId:
 *                 type: string
 *                 description: ID of the course this subject belongs to
 *                 example: "65a1234567890abcdef12345"
 *               description:
 *                 type: string
 *                 example: "Core mathematics subject covering all basics"
 *     responses:
 *       201:
 *         description: Subject created successfully
 *   get:
 *     summary: Get all subjects
 *     tags: [Admin - Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subjects fetched
 */
router.post('/', createSubject);
router.get('/', getAllSubjects);

/**
 * @swagger
 * /api/admin/subjects/{id}:
 *   get:
 *     summary: Get a single subject by ID
 *     tags: [Admin - Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Subject ID
 *     responses:
 *       200:
 *         description: Subject details fetched
 *   patch:
 *     summary: Update subject details
 *     tags: [Admin - Subjects]
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *   delete:
 *     summary: Soft delete a subject
 *     tags: [Admin - Subjects]
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
 *         description: Subject deleted successfully
 */
router.get('/:id', getSubjectById);
router.patch('/:id', updateSubject);
router.delete('/:id', deleteSubject);

/**
 * @swagger
 * /api/admin/subjects/{id}/status:
 *   patch:
 *     summary: Toggle subject status (Enable/Disable)
 *     tags: [Admin - Subjects]
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
 *         description: Subject status updated
 */
router.patch('/:id/status', toggleSubjectStatus);

export default router;