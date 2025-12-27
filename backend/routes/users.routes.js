import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Array of users
 */
router.get("/", getUsers);

export default router;
