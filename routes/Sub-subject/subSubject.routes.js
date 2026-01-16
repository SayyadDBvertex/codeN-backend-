// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createSubSubject,
//   getAllSubSubjects,
//   getSubSubjectById,
//   updateSubSubject,
//   deleteSubSubject,
//   toggleSubSubjectStatus,
// } from '../../controllers/Sub-subject/subSubject.controller.js';

// const router = express.Router();

// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// // Create sub-subject
// router.post('/', createSubSubject);

// // Get all sub-subjects
// router.get('/', getAllSubSubjects);

// // Get single sub-subject
// router.get('/:id', getSubSubjectById);

// // Update sub-subject
// router.patch('/:id', updateSubSubject);

// // Delete sub-subject (soft delete)
// router.delete('/:id', deleteSubSubject);

// // Toggle sub-subject status (enable/disable)
// router.patch('/:id/status', toggleSubSubjectStatus);

// export default router;



import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import {
  createSubSubject,
  getAllSubSubjects,
  getSubSubjectById,
  updateSubSubject,
  deleteSubSubject,
  toggleSubSubjectStatus,
} from '../../controllers/Sub-subject/subSubject.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Sub-Subjects
 *   description: Sub-Subject management (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/sub-subjects:
 *   post:
 *     summary: Create a new sub-subject
 *     tags: [Admin - Sub-Subjects]
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
 *               - subjectId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Calculus"
 *               subjectId:
 *                 type: string
 *                 description: ID of the parent subject
 *                 example: "65a123..."
 *               description:
 *                 type: string
 *                 example: "Detailed study of limits and derivatives"
 *     responses:
 *       201:
 *         description: Sub-subject created successfully
 *   get:
 *     summary: Get all sub-subjects
 *     tags: [Admin - Sub-Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sub-subjects fetched
 */
router.post('/', createSubSubject);
router.get('/', getAllSubSubjects);

/**
 * @swagger
 * /api/admin/sub-subjects/{id}:
 *   get:
 *     summary: Get single sub-subject by ID
 *     tags: [Admin - Sub-Subjects]
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
 *         description: Sub-subject details fetched
 *   patch:
 *     summary: Update sub-subject details
 *     tags: [Admin - Sub-Subjects]
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
 *         description: Sub-subject updated successfully
 *   delete:
 *     summary: Delete a sub-subject (Soft Delete)
 *     tags: [Admin - Sub-Subjects]
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
 *         description: Sub-subject deleted successfully
 */
router.get('/:id', getSubSubjectById);
router.patch('/:id', updateSubSubject);
router.delete('/:id', deleteSubSubject);

/**
 * @swagger
 * /api/admin/sub-subjects/{id}/status:
 *   patch:
 *     summary: Toggle sub-subject status (Enable/Disable)
 *     tags: [Admin - Sub-Subjects]
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
 *         description: Sub-subject status updated
 */
router.patch('/:id/status', toggleSubSubjectStatus);

export default router;