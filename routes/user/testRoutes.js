// import express from 'express';
// import {
//   getAvailableTests,
//   startTest,
//   getNextQuestion,
//   submitAnswer,
//   submitTest,
// } from '../../controllers/user/testAttemptController.js';
// import { protect } from '../../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', protect, getAvailableTests);
// router.post('/:testId/start', protect, startTest);
// router.get('/attempt/:attemptId/question', protect, getNextQuestion);
// router.post('/attempt/:attemptId/answer', protect, submitAnswer);
// router.post('/attempt/:attemptId/submit', protect, submitTest);

// export default router;



import express from 'express';
import {
  getAvailableTests,
  startTest,
  getNextQuestion,
  submitAnswer,
  submitTest,
} from '../../controllers/user/testAttemptController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User - Test Attempt
 *   description: APIs for users to browse, start, and attempt tests
 */

// Sabhi routes protected hain (User Token zaroori hai)
router.use(protect);

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Get list of all available tests for the user
 *     tags: [User - Test Attempt]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tests fetched successfully
 */
router.get('/', getAvailableTests);

/**
 * @swagger
 * /api/tests/{testId}/start:
 *   post:
 *     summary: Start a specific test
 *     tags: [User - Test Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the test to start
 *         example: "65a1234567890abcdef12345"
 *     responses:
 *       200:
 *         description: Test attempt started, returns attemptId
 */
router.post('/:testId/start', startTest);

/**
 * @swagger
 * /api/tests/attempt/{attemptId}/question:
 *   get:
 *     summary: Get the next/current question for an ongoing test
 *     tags: [User - Test Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the current test attempt
 *     responses:
 *       200:
 *         description: Returns question details
 */
router.get('/attempt/:attemptId/question', getNextQuestion);

/**
 * @swagger
 * /api/tests/attempt/{attemptId}/answer:
 *   post:
 *     summary: Submit an answer for a question
 *     tags: [User - Test Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionId
 *               - selectedOption
 *             properties:
 *               questionId:
 *                 type: string
 *                 example: "65b4567890"
 *               selectedOption:
 *                 type: string
 *                 example: "Option A"
 *     responses:
 *       200:
 *         description: Answer saved successfully
 */
router.post('/attempt/:attemptId/answer', submitAnswer);

/**
 * @swagger
 * /api/tests/attempt/{attemptId}/submit:
 *   post:
 *     summary: Final submission of the test
 *     tags: [User - Test Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Test submitted successfully, returns result/score
 */
router.post('/attempt/:attemptId/submit', submitTest);

export default router;