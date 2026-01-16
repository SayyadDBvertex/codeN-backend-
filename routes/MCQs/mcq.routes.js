// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createMCQ,
//   getAllMCQs,
//   getMCQById,
//   updateMCQ,
//   deleteMCQ,
//   toggleMCQStatus,
// } from '../../controllers/MCQs/mcq.controller.js';

// const router = express.Router();

// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// // Create MCQ
// router.post('/', createMCQ);

// // Get all MCQs
// router.get('/', getAllMCQs);

// // Get single MCQ
// router.get('/:id', getMCQById);

// // Update MCQ
// router.patch('/:id', updateMCQ);

// // Delete MCQ (soft delete)
// router.delete('/:id', deleteMCQ);

// // Toggle MCQ status (enable/disable)
// router.patch('/:id/status', toggleMCQStatus);

// export default router;



import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import {
  createMCQ,
  getAllMCQs,
  getMCQById,
  updateMCQ,
  deleteMCQ,
  toggleMCQStatus,
} from '../../controllers/MCQs/mcq.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - MCQs
 *   description: Multiple Choice Questions management (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/mcqs:
 *   post:
 *     summary: Create a new MCQ
 *     tags: [Admin - MCQs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *               - correctOption
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is the capital of India?"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mumbai", "Delhi", "Chennai", "Kolkata"]
 *               correctOption:
 *                 type: string
 *                 example: "Delhi"
 *               explanation:
 *                 type: string
 *                 example: "New Delhi is the official capital of India."
 *               subjectId:
 *                 type: string
 *                 example: "65a123..."
 *               chapterId:
 *                 type: string
 *                 example: "65b456..."
 *     responses:
 *       201:
 *         description: MCQ created successfully
 *   get:
 *     summary: Get all MCQs
 *     tags: [Admin - MCQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *         description: Filter by Subject ID
 *       - in: query
 *         name: chapterId
 *         schema:
 *           type: string
 *         description: Filter by Chapter ID
 *     responses:
 *       200:
 *         description: List of MCQs fetched
 */
router.post('/', createMCQ);
router.get('/', getAllMCQs);

/**
 * @swagger
 * /api/admin/mcqs/{id}:
 *   get:
 *     summary: Get single MCQ by ID
 *     tags: [Admin - MCQs]
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
 *         description: MCQ details fetched
 *   patch:
 *     summary: Update an MCQ
 *     tags: [Admin - MCQs]
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
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctOption:
 *                 type: string
 *     responses:
 *       200:
 *         description: MCQ updated successfully
 *   delete:
 *     summary: Delete an MCQ (Soft Delete)
 *     tags: [Admin - MCQs]
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
 *         description: MCQ deleted successfully
 */
router.get('/:id', getMCQById);
router.patch('/:id', updateMCQ);
router.delete('/:id', deleteMCQ);

/**
 * @swagger
 * /api/admin/mcqs/{id}/status:
 *   patch:
 *     summary: Toggle MCQ status (Enable/Disable)
 *     tags: [Admin - MCQs]
 *     security:
 *       - bearerAuth: []
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: MCQ status updated
 */
router.patch('/:id/status', toggleMCQStatus);

export default router;