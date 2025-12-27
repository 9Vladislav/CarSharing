import { Router } from "express";
import { getCars, getCarDetails } from "../controllers/cars.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Cars
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     tags: [Cars]
 *     summary: Get list of cars with categories
 *     responses:
 *       200:
 *         description: Array of cars
 */
router.get("/", getCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     tags: [Cars]
 *     summary: Get car details + its rentals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car object + rentals list
 *       404:
 *         description: Car not found
 */
router.get("/:id", getCarDetails);

export default router;
