// import express from 'express';
// const router = express.Router();
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';
// import { addTerms, getTerms } from '../../controllers/Terms&Condition/terms.controller.js';




// // All routes are protected and require admin role
// router.use(protect);
// router.use(authorize('admin'));

// router.post('/terms-conditions', addTerms);
// router.get('/terms-conditions', getTerms);

// export default router;


import express from 'express';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';
import { addTerms, getTerms } from '../../controllers/Terms&Condition/terms.controller.js';

/**
 * @swagger
 * tags:
 *   name: Admin - Terms & Conditions
 *   description: Terms and Conditions management (Admin Only)
 */

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /api/admin/terms/terms-conditions:
 *   post:
 *     summary: Add or Update Terms and Conditions
 *     tags: [Admin - Terms & Conditions]
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
 *                 example: "Terms and Conditions"
 *               content:
 *                 type: string
 *                 example: "By using this app, you agree to our terms..."
 *     responses:
 *       200:
 *         description: Terms and Conditions saved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.post('/terms-conditions', addTerms);

/**
 * @swagger
 * /api/admin/terms/terms-conditions:
 *   get:
 *     summary: Fetch Terms and Conditions
 *     tags: [Admin - Terms & Conditions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Terms and Conditions fetched successfully
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
router.get('/terms-conditions', getTerms);

export default router;