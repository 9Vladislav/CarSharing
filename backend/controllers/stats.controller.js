import { getPool, sql } from "../config/db.js";

export async function countBelowAvg(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT dbo.CountCategoriesBelowAvgPrice() AS Value
    `);

    res.json({ value: result.recordset[0]?.Value ?? 0 });
  } catch (err) {
    next(err);
  }
}

export async function countBelowPrice(req, res, next) {
  try {
    const max = Number(req.query.max);
    if (!max) return res.status(400).json({ error: "query ?max= is required" });

    const pool = await getPool();
    const result = await pool
      .request()
      .input("MaxPrice", sql.Decimal(10, 2), max)
      .query(`SELECT dbo.CountCategoriesBelowPrice(@MaxPrice) AS Value`);

    res.json({ max, value: result.recordset[0]?.Value ?? 0 });
  } catch (err) {
    next(err);
  }
}
