import { Router } from "express";
import { getCategories } from "../controllers/categories.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all car categories
 *     responses:
 *       200:
 *         description: Array of categories
 */
router.get("/", getCategories);

export default router;
