// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createChapter,
//   getAllChapters,
//   getChapterById,
//   updateChapter,
//   deleteChapter,
//   toggleChapterStatus,
// } from '../../controllers/Chapter/chapter.controller.js';
// import upload from '../../middleware/upload.js';

// const router = express.Router();

// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// // Create chapter
// router.post('/', upload.single('image'), createChapter);

// // Get all chapters
// router.get('/', getAllChapters);

// // Get single chapter
// router.get('/:id', getChapterById);

// // Update chapter
// router.patch('/:id', upload.single('image'), updateChapter);

// // Delete chapter (soft delete)
// router.delete('/:id', deleteChapter);

// // Toggle chapter status (enable/disable)
// router.patch('/:id/status', toggleChapterStatus);

// export default router;


import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
  toggleChapterStatus,
} from '../../controllers/Chapter/chapter.controller.js';
import upload from '../../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Chapters
 *   description: Chapter management APIs (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/chapters:
 *   post:
 *     summary: Create a new chapter with an image
 *     tags: [Admin - Chapters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Introduction to Algebra"
 *               subjectId:
 *                 type: string
 *                 example: "65a123..."
 *               description:
 *                 type: string
 *                 example: "Basic concepts of Algebra"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *   get:
 *     summary: Get all chapters
 *     tags: [Admin - Chapters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all chapters
 */
router.post('/', upload.single('image'), createChapter);
router.get('/', getAllChapters);

/**
 * @swagger
 * /api/admin/chapters/{id}:
 *   get:
 *     summary: Get a single chapter by ID
 *     tags: [Admin - Chapters]
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
 *         description: Chapter details fetched
 *   patch:
 *     summary: Update chapter details and/or image
 *     tags: [Admin - Chapters]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *   delete:
 *     summary: Soft delete a chapter
 *     tags: [Admin - Chapters]
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
 *         description: Chapter deleted successfully
 */
router.get('/:id', getChapterById);
router.patch('/:id', upload.single('image'), updateChapter);
router.delete('/:id', deleteChapter);

/**
 * @swagger
 * /api/admin/chapters/{id}/status:
 *   patch:
 *     summary: Toggle chapter status (Enable/Disable)
 *     tags: [Admin - Chapters]
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
 *         description: Status toggled successfully
 */
router.patch('/:id/status', toggleChapterStatus);

export default router;