import express from 'express';
import {
  createTest,
  getAllTests,
  updateTest,
  deleteTest,
  publishTest,
} from '../../controllers/admin/testController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTest); // Create
router.get('/', protect, getAllTests); // Table
router.put('/:id', protect, updateTest); // Update
router.delete('/:id', protect, deleteTest); // Delete
router.patch('/:id/publish', protect, publishTest); // Publish

export default router;
