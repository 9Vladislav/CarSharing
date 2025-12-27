import { getPool } from "../config/db.js";

export async function getUsers(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT UserId, FirstName, LastName, Phone, Email, DriverLicenseNo, RegisteredAt
      FROM Users
      ORDER BY UserId DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}
