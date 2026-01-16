// import express from 'express';
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import {
//   createMCQ,
//   getAllMCQs,
//   getMCQById,
//   updateMCQ,
//   deleteMCQ,
//   // toggleMCQStatus,
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
// // router.patch('/:id/status', toggleMCQStatus);

// export default router;

import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import uploadAdminProfile from '../../middleware/upload.js'; // Aapka updated middleware
import {
  createMCQ,
  getAllMCQs,
  getMCQById,
  updateMCQ,
  deleteMCQ,
  toggleMCQStatus,
} from '../../controllers/MCQs/mcq.controller.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * 🔹 Multer Configuration for MCQ Images
 * questionImages: multiple images for question body
 * explanationImages: multiple images for explanation body
 * optionImage_0 to 3: individual images for each MCQ option
 */
const mcqUploadFields = uploadAdminProfile.fields([
  { name: 'questionImages', maxCount: 5 },
  { name: 'explanationImages', maxCount: 5 },
  { name: 'optionImage_0', maxCount: 1 },
  { name: 'optionImage_1', maxCount: 1 },
  { name: 'optionImage_2', maxCount: 1 },
  { name: 'optionImage_3', maxCount: 1 },
]);

// ✅ Create MCQ (With Image Upload)
router.post('/', mcqUploadFields, createMCQ);

// ✅ Get all MCQs
router.get('/', getAllMCQs);

// ✅ Get single MCQ
router.get('/:id', getMCQById);

// ✅ Update MCQ (With Image Upload Support)
// Note: Changed from PATCH to PUT to fully support multipart/form-data updates
router.put('/:id', mcqUploadFields, updateMCQ);

// ✅ Delete MCQ (Permanent or Soft Delete based on your controller)
router.delete('/:id', deleteMCQ);

// ✅ Toggle MCQ status (enable/disable)
router.patch('/:id/status', toggleMCQStatus);

export default router;