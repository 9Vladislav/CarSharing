import { getPool } from "../config/db.js";

export async function getCategories(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT CategoryId, CategoryName, PricePerHour, Description
      FROM CarCategory
      ORDER BY CategoryId DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}
