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
    getTestById, 
    updateTest, 
    deleteTest 
} from '../../controllers/admin/testController.js';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import uploadAdminProfile from '../../middleware/upload.js';
const router = express.Router();
router.use(protect);
router.use(authorize('admin')); 

router.post('/upload-image', uploadAdminProfile.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    
  
    const filePath = `/uploads/mcq-images/${req.file.filename}`;
    res.status(200).json({ success: true, url: filePath });
});


router.route('/')
    .post(protect, createTest)
    .get(protect, getAllTests);

router.route('/:id')
    .get(protect, getTestById)
    .put(protect, updateTest)
    .delete(protect, deleteTest);

export default router;