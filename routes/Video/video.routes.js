// import express from 'express';
// const router = express.Router();
// import { uploadVideoFile } from '../../middleware/uploadMiddleware.js'


// import { 
//     createVideo, 
//     getAllVideos, 
//     deleteVideo 
// } from '../../controllers/Video/video.controller.js';



// /**
//  * @route   POST /api/admin/videos
//  * @desc    Create a new video
//  */
// router.post('/', uploadVideoFile.single('video'), createVideo);

// /**
//  * @route   GET /api/admin/videos
//  * @desc    Get all videos (Can filter by chapterId in query)
//  */
// router.get('/', getAllVideos);

// /**
//  * @route   DELETE /api/admin/videos/:id
//  * @desc    Delete a video
//  */
// router.delete('/:id', deleteVideo);

// export default router;


import express from 'express';
const router = express.Router();
import { uploadVideoFile } from '../../middleware/uploadMiddleware.js'

import { 
    createVideo, 
    getAllVideos, 
    deleteVideo 
} from '../../controllers/Video/video.controller.js';

/**
 * @swagger
 * tags:
 *   name: Admin - Videos
 *   description: Video management and uploading APIs (Admin Only)
 */

/**
 * @swagger
 * /api/admin/videos:
 *   post:
 *     summary: Upload a new video file and details
 *     tags: [Admin - Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Thermodynamics"
 *               description:
 *                 type: string
 *                 example: "First lecture of Physics Chapter 1"
 *               chapterId:
 *                 type: string
 *                 example: "65a1234567890"
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Select the video file to upload
 *     responses:
 *       201:
 *         description: Video uploaded successfully
 *       400:
 *         description: Invalid input or file format
 */
router.post('/', uploadVideoFile.single('video'), createVideo);

/**
 * @swagger
 * /api/admin/videos:
 *   get:
 *     summary: Get all videos (with optional chapter filter)
 *     tags: [Admin - Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chapterId
 *         schema:
 *           type: string
 *         description: Filter videos by Chapter ID
 *     responses:
 *       200:
 *         description: List of videos fetched successfully
 */
router.get('/', getAllVideos);

/**
 * @swagger
 * /api/admin/videos/{id}:
 *   delete:
 *     summary: Delete a video by ID
 *     tags: [Admin - Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Video ID to delete
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 */
router.delete('/:id', deleteVideo);

export default router;