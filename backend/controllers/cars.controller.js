import { getPool, sql } from "../config/db.js";

export async function getCars(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT
        c.CarId,
        c.PlateNumber,
        c.Brand,
        c.Model,
        c.[Year],
        c.[Status],
        cc.CategoryId,
        cc.CategoryName,
        cc.PricePerHour
      FROM Cars c
      JOIN CarCategory cc ON cc.CategoryId = c.CategoryId
      ORDER BY c.CarId DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}

export async function getCarDetails(req, res, next) {
  try {
    const carId = Number(req.params.id);
    if (!carId) return res.status(400).json({ error: "Invalid car id" });

    const pool = await getPool();

    const carRes = await pool
      .request()
      .input("CarId", sql.Int, carId)
      .query(`
        SELECT
          c.CarId,
          c.PlateNumber,
          c.Brand,
          c.Model,
          c.[Year],
          c.[Status],
          cc.CategoryId,
          cc.CategoryName,
          cc.PricePerHour,
          cc.Description
        FROM Cars c
        JOIN CarCategory cc ON cc.CategoryId = c.CategoryId
        WHERE c.CarId = @CarId
      `);

    const car = carRes.recordset[0];
    if (!car) return res.status(404).json({ error: "Car not found" });

    const rentalsRes = await pool
      .request()
      .input("CarId", sql.Int, carId)
      .query(`
        SELECT
          r.RentalId, r.RentalNo, r.StartAt, r.EndAt, r.Hours, r.[Status],
          r.PricePerHourAtMoment, r.TotalAmount,
          u.UserId, u.FirstName, u.LastName, u.Phone
        FROM Rentals r
        JOIN Users u ON u.UserId = r.UserId
        WHERE r.CarId = @CarId
        ORDER BY r.StartAt DESC
      `);

    res.json({ car, rentals: rentalsRes.recordset });
  } catch (err) {
    next(err);
  }
}
