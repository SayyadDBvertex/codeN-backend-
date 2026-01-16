// import express from 'express';
// const router = express.Router();
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import { addPrivacyPolicy, getPrivacyPolicy } from '../../controllers/PrivacyPolicy/privacy.controller.js';

// router.use(protect);
// router.use(authorize('admin'));
// router.post('/privacy-policy', addPrivacyPolicy);
// router.get('/privacy-policy', getPrivacyPolicy);

// export default router;


import express from 'express';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import { addPrivacyPolicy, getPrivacyPolicy } from '../../controllers/PrivacyPolicy/privacy.controller.js';

/**
 * @swagger
 * tags:
 *   name: Admin - Privacy Policy
 *   description: Privacy Policy management (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/privacy/privacy-policy:
 *   post:
 *     summary: Add or Update Privacy Policy
 *     tags: [Admin - Privacy Policy]
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
 *                 example: "Privacy Policy"
 *               content:
 *                 type: string
 *                 example: "We value your privacy. This policy explains how we collect data..."
 *     responses:
 *       200:
 *         description: Privacy Policy saved successfully
 *       401:
 *         description: Unauthorized - Token missing
 *       403:
 *         description: Forbidden - Admin access only
 */
router.post('/privacy-policy', addPrivacyPolicy);

/**
 * @swagger
 * /api/admin/privacy/privacy-policy:
 *   get:
 *     summary: Fetch the current Privacy Policy
 *     tags: [Admin - Privacy Policy]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Privacy Policy data fetched successfully
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
router.get('/privacy-policy', getPrivacyPolicy);

export default router;