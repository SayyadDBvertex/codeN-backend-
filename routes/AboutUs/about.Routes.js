// import express from "express";

// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js'
// const router = express.Router();
// import { addAboutUs, getAboutUs } from "../../controllers/AboutUs/aboutus.controller.js";
// router.use(protect);
// router.use(authorize('admin'));


// router.post("/about-us", addAboutUs); // POST used for both Add and Edit
// router.get("/about-us", getAboutUs);   // GET for fetching data

// export default router;




import express from "express";
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js'
import { addAboutUs, getAboutUs } from "../../controllers/AboutUs/aboutus.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - About Us
 *   description: About Us content management (Admin Only)
 */

// Middleware application
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/about-us:
 *   post:
 *     summary: Add or Update About Us content
 *     tags: [Admin - About Us]
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
 *                 example: "About CodeN"
 *               content:
 *                 type: string
 *                 example: "CodeN is a platform for learning and growth..."
 *     responses:
 *       200:
 *         description: About Us content saved successfully
 *       401:
 *         description: Unauthorized - Token missing
 *       403:
 *         description: Forbidden - Only Admin can access
 */
router.post("/about-us", addAboutUs);

/**
 * @swagger
 * /api/admin/about-us:
 *   get:
 *     summary: Get About Us content
 *     tags: [Admin - About Us]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/about-us", getAboutUs);

export default router;