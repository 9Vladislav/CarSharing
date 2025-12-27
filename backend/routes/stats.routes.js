import { Router } from "express";
import { countBelowAvg, countBelowPrice } from "../controllers/stats.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Stats
 */

/**
 * @swagger
 * /api/stats/below-avg:
 *   get:
 *     tags: [Stats]
 *     summary: Scalar function dbo.CountCategoriesBelowAvgPrice()
 *     responses:
 *       200:
 *         description: Value
 */
router.get("/below-avg", countBelowAvg);

/**
 * @swagger
 * /api/stats/below-price:
 *   get:
 *     tags: [Stats]
 *     summary: Scalar function dbo.CountCategoriesBelowPrice(@MaxPrice)
 *     parameters:
 *       - in: query
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Value
 *       400:
 *         description: max is required
 */
router.get("/below-price", countBelowPrice);

export default router;
