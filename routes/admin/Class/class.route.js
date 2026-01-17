import express from 'express';
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
} from '../../controllers/admin/class.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createClass); // CREATE
router.get('/', protect, getAllClasses); // READ
router.put('/:id', protect, updateClass); // UPDATE
router.delete('/:id', protect, deleteClass); // DELETE

export default router;
