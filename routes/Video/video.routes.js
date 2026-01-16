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
    deleteVideo,
    updateVideo // ✅ Update controller import kiya
} from '../../controllers/Video/video.controller.js';

/**
 * @route   POST /api/admin/videos
 * @desc    Create a new video with Thumbnail and Notes
 */
router.post(
    '/', 
    uploadVideoFile.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'notes', maxCount: 1 }
    ]), 
    createVideo
);

/**
 * @route   GET /api/admin/videos
 * @desc    Get all videos
 */
router.get('/', getAllVideos);

/**
 * @route   PUT /api/admin/videos/:id
 * @desc    Update video details or files
 */
router.put(
    '/:id', 
    uploadVideoFile.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'notes', maxCount: 1 }
    ]), 
    updateVideo
);

/**
 * @route   DELETE /api/admin/videos/:id
 * @desc    Delete a video
 */
router.delete('/:id', deleteVideo);

export default router;