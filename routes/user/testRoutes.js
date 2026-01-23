import express from 'express';
import {
  getAvailableTests,
  startTest,
  getNextQuestion,
  submitAnswer,
  submitTest,
  getTestResult,
  getTestReview,
} from '../../controllers/user/testAttemptController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Result & Review
router.get('/test-result/:userId/:testId', protect, getTestResult);
router.get('/test-review/:userId/:testId', protect, getTestReview);

// Browse Tests
router.get('/', protect, getAvailableTests);

// Start Test
router.post('/:testId/start', protect, startTest);

// Test Flow
router.get('/attempt/:attemptId/question', protect, getNextQuestion);
router.post('/attempt/:attemptId/answer', protect, submitAnswer);
router.post('/attempt/:attemptId/submit', protect, submitTest);

export default router;
