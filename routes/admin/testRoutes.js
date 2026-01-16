// import express from 'express';
// import {
//   createTest,
//   getAllTests,
//   updateTest,
//   deleteTest,
//   publishTest,
//   unpublishTest,
// } from '../../controllers/admin/testController.js';
// import { protect } from '../../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createTest); // Create
// router.get('/', protect, getAllTests); // Table
// router.put('/:id', protect, updateTest); // Update

// router.delete('/:id', protect, deleteTest); // Delete
// router.patch('/:id/publish', protect, publishTest); // Publish
// router.patch('/:id/unpublish', protect, unpublishTest);

// export default router;



import express from 'express';
import {
  createTest,
  getAllTests,
  updateTest,
  deleteTest,
  publishTest,
  unpublishTest,
} from '../../controllers/admin/testController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Tests
 *   description: API for managing tests (Admin Only)
 */

/**
 * @swagger
 * /api/admin/tests:
 *   post:
 *     summary: Create a new test
 *     tags: [Admin - Tests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Final Mock Test"
 *               duration:
 *                 type: number
 *                 description: Duration in minutes
 *                 example: 60
 *               totalMarks:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Test created successfully
 *   get:
 *     summary: Get all tests (Table view)
 *     tags: [Admin - Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tests fetched
 */
router.post('/', protect, createTest); 
router.get('/', protect, getAllTests); 

/**
 * @swagger
 * /api/admin/tests/{id}:
 *   put:
 *     summary: Update an existing test
 *     tags: [Admin - Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Test ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Test updated successfully
 *   delete:
 *     summary: Delete a test
 *     tags: [Admin - Tests]
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
 *         description: Test deleted
 */
router.put('/:id', protect, updateTest); 
router.delete('/:id', protect, deleteTest); 

/**
 * @swagger
 * /api/admin/tests/{id}/publish:
 *   patch:
 *     summary: Publish a test (Make it live)
 *     tags: [Admin - Tests]
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
 *         description: Test published successfully
 */
router.patch('/:id/publish', protect, publishTest); 

/**
 * @swagger
 * /api/admin/tests/{id}/unpublish:
 *   patch:
 *     summary: Unpublish a test (Hide it)
 *     tags: [Admin - Tests]
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
 *         description: Test unpublished successfully
 */
router.patch('/:id/unpublish', protect, unpublishTest);

export default router;