// import express from 'express';
// import {
//   addBookmark,
//   removeBookmark,
//   getMyBookmarks,
//   toggleBookmark,
// } from '../controllers/bookmarkController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, addBookmark);
// router.delete('/', protect, removeBookmark);
// router.get('/', protect, getMyBookmarks);
// router.post('/toggle', protect, toggleBookmark);

// export default router;


import express from 'express';
import {
  addBookmark,
  removeBookmark,
  getMyBookmarks,
  toggleBookmark,
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User - Bookmarks
 *   description: APIs for users to manage their bookmarked MCQs/Content
 */

// Sabhi routes login protected hain
router.use(protect);

/**
 * @swagger
 * /api/bookmarks:
 *   post:
 *     summary: Add a new bookmark
 *     tags: [User - Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mcqId
 *             properties:
 *               mcqId:
 *                 type: string
 *                 description: The ID of the MCQ to bookmark
 *                 example: "65a1234567890abcdef"
 *     responses:
 *       201:
 *         description: Bookmark added successfully
 *   get:
 *     summary: Get all bookmarks of the logged-in user
 *     tags: [User - Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookmarks fetched successfully
 */
router.post('/', addBookmark);
router.get('/', getMyBookmarks);

/**
 * @swagger
 * /api/bookmarks:
 *   delete:
 *     summary: Remove a bookmark
 *     tags: [User - Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mcqId
 *             properties:
 *               mcqId:
 *                 type: string
 *                 example: "65a1234567890abcdef"
 *     responses:
 *       200:
 *         description: Bookmark removed successfully
 */
router.delete('/', removeBookmark);

/**
 * @swagger
 * /api/bookmarks/toggle:
 *   post:
 *     summary: Toggle bookmark (Add if not exists, Remove if exists)
 *     tags: [User - Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mcqId
 *             properties:
 *               mcqId:
 *                 type: string
 *                 example: "65a1234567890abcdef"
 *     responses:
 *       200:
 *         description: Bookmark toggled successfully
 */
router.post('/toggle', toggleBookmark);

export default router;