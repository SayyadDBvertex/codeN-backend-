// import express from "express";
// const router = express.Router();
// import { protect } from '../../middleware/authMiddleware.js';
// import { authorize } from '../../middleware/Authorization.middleware.js';

// // 1. Controller Imports (Comma check karein)
// import { 
//   createSubscriptionPlan, 
//   updateSubscriptionPlan, 
//   buySubscriptionPlan, 
//   getAllPlansForAdmin,    
//   getAllTransactionsForAdmin 
// } from "../../controllers/Subscription/subscription.controller.js";


// router.use(protect);

// router.post("/buy-plan", buySubscriptionPlan);

// router.use(authorize('admin'));

// router.post("/create-plan", createSubscriptionPlan);
// router.put("/update-plan/:planId", updateSubscriptionPlan);
// router.get("/admin/all-plans", getAllPlansForAdmin);
// router.get("/admin/transactions", getAllTransactionsForAdmin);

// export default router;


import express from "express";
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/Authorization.middleware.js';

// Controller Imports
import { 
  createSubscriptionPlan, 
  updateSubscriptionPlan, 
  buySubscriptionPlan, 
  getAllPlansForAdmin,    
  getAllTransactionsForAdmin 
} from "../../controllers/Subscription/subscription.controller.js";

/**
 * @swagger
 * tags:
 *   - name: Subscription - User
 *     description: APIs for users to buy plans
 *   - name: Admin - Subscription
 *     description: APIs for admin to manage plans and transactions
 */

// Sabhi routes ke liye login zaroori hai
router.use(protect);

/**
 * @swagger
 * /api/plans/buy-plan:
 *   post:
 *     summary: User buys a subscription plan
 *     tags: [Subscription - User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *                 example: "65a1234567890"
 *               paymentId:
 *                 type: string
 *                 description: Transaction ID from payment gateway
 *                 example: "pay_N9zK8k2lM1"
 *     responses:
 *       200:
 *         description: Subscription purchased successfully
 */
router.post("/buy-plan", buySubscriptionPlan);

// Iske niche ke saare routes sirf Admin access kar sakta hai
router.use(authorize('admin'));

/**
 * @swagger
 * /api/plans/create-plan:
 *   post:
 *     summary: Create a new subscription plan
 *     tags: [Admin - Subscription]
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
 *               - price
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Monthly"
 *               price:
 *                 type: number
 *                 example: 499
 *               duration:
 *                 type: number
 *                 description: Duration in days
 *                 example: 30
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Ad-free", "Offline access", "24/7 Support"]
 *     responses:
 *       201:
 *         description: Plan created successfully
 */
router.post("/create-plan", createSubscriptionPlan);

/**
 * @swagger
 * /api/plans/update-plan/{planId}:
 *   put:
 *     summary: Update an existing plan
 *     tags: [Admin - Subscription]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Plan updated successfully
 */
router.put("/update-plan/:planId", updateSubscriptionPlan);

/**
 * @swagger
 * /api/plans/admin/all-plans:
 *   get:
 *     summary: Get all plans for admin management
 *     tags: [Admin - Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all plans fetched
 */
router.get("/admin/all-plans", getAllPlansForAdmin);

/**
 * @swagger
 * /api/plans/admin/transactions:
 *   get:
 *     summary: View all user payment transactions
 *     tags: [Admin - Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transactions fetched
 */
router.get("/admin/transactions", getAllTransactionsForAdmin);

export default router;