// import express from 'express'
// import { protect } from '../../middleware/authMiddleware.js'
// import { authorize } from '../../middleware/Authorization.middleware.js'

// import {
//   createTag,
//   getTags,
//   updateTag,
//   deleteTag,
// } from '../../controllers/Tags/tag.controller.js'

// const router = express.Router();

// router.use(protect);
// router.use(authorize('admin'));

// router.post('/', createTag); // create tag
// router.get('/', getTags); // get tags (by chapterId)
// router.patch('/:id', updateTag); // update tag
// router.delete('/:id', deleteTag); // delete tag

// export default router;


import express from 'express'
import { protect } from '../../middleware/authMiddleware.js'
import { authorize } from '../../middleware/Authorization.middleware.js'

import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from '../../controllers/Tags/tag.controller.js'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Tags
 *   description: Tag management APIs for categorizing content (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Admin - Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Important"
 *               chapterId:
 *                 type: string
 *                 description: (Optional) Associate tag with a specific chapter
 *                 example: "65a1234567890"
 *     responses:
 *       201:
 *         description: Tag created successfully
 *   get:
 *     summary: Get all tags
 *     tags: [Admin - Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chapterId
 *         schema:
 *           type: string
 *         description: Filter tags by Chapter ID
 *     responses:
 *       200:
 *         description: List of tags fetched successfully
 */
router.post('/', createTag); 
router.get('/', getTags); 

/**
 * @swagger
 * /api/admin/tags/{id}:
 *   patch:
 *     summary: Update an existing tag
 *     tags: [Admin - Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Revised Notes"
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *   delete:
 *     summary: Delete a tag
 *     tags: [Admin - Tags]
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
 *         description: Tag deleted successfully
 */
router.patch('/:id', updateTag); 
router.delete('/:id', deleteTag); 

export default router;