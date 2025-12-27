import { Router } from "express";
import {
  getRentals,
  getActiveRentals,
  createRental,
  createRentalByCarName,
  testDbException,
} from "../controllers/rentals.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Rentals
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     tags: [Rentals]
 *     summary: Get all rentals (with user and car)
 *     responses:
 *       200:
 *         description: Array of rentals
 */
router.get("/", getRentals);

/**
 * @swagger
 * /api/rentals/active:
 *   get:
 *     tags: [Rentals]
 *     summary: Get active rentals via table function dbo.GetActiveRentals() (LB3 пункт 3)
 *     responses:
 *       200:
 *         description: Array of active rentals
 */
router.get("/active", getActiveRentals);

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     tags: [Rentals]
 *     summary: Create rental via stored procedure CreateRental (LB3 пункт 2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, carId]
 *             properties:
 *               userId:
 *                 type: integer
 *               carId:
 *                 type: integer
 *               hours:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation or DB business error
 */
router.post("/", createRental);

/**
 * @swagger
 * /api/rentals/by-car-name:
 *   post:
 *     tags: [Rentals]
 *     summary: Create rental via procedure AddRentalByCarName
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [carName, userId]
 *             properties:
 *               carName:
 *                 type: string
 *               userId:
 *                 type: integer
 *               hours:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/by-car-name", createRentalByCarName);

/**
 * @swagger
 * /api/rentals/test-exception:
 *   post:
 *     tags: [Rentals]
 *     summary: Test DB exception (RAISERROR from trigger) (LB3 пункт 4)
 *     description: Tries to insert rental at night time to force DB error. Should return 400 with DB error message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, carId]
 *             properties:
 *               userId:
 *                 type: integer
 *               carId:
 *                 type: integer
 *     responses:
 *       400:
 *         description: DB user-defined error
 *       200:
 *         description: Inserted (if trigger not fired)
 */
router.post("/test-exception", testDbException);

export default router;
