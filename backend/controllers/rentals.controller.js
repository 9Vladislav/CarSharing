import { getPool, sql } from "../config/db.js";

export async function getRentals(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT
        r.RentalId, r.RentalNo, r.StartAt, r.EndAt, r.Hours, r.[Status],
        r.PricePerHourAtMoment, r.TotalAmount,
        u.UserId, u.FirstName, u.LastName, u.Phone,
        c.CarId, c.Brand, c.Model, c.PlateNumber
      FROM Rentals r
      JOIN Users u ON u.UserId = r.UserId
      JOIN Cars c  ON c.CarId  = r.CarId
      ORDER BY r.RentalId DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}

export async function getActiveRentals(req, res, next) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT *
      FROM dbo.GetActiveRentals()
      ORDER BY RentalId DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}

export async function createRental(req, res, next) {
  try {
    const { userId, carId, hours = 1 } = req.body;

    if (!userId || !carId)
      return res.status(400).json({ error: "userId and carId are required" });

    const pool = await getPool();
    const result = await pool
      .request()
      .input("UserId", sql.Int, Number(userId))
      .input("CarId", sql.Int, Number(carId))
      .input("Hours", sql.Int, Number(hours))
      .execute("CreateRental");

    res.status(201).json({
      ok: true,
      message: "Rental created",
      db: {
        rowsAffected: result.rowsAffected,
        recordsetsCount: result.recordsets?.length || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function createRentalByCarName(req, res, next) {
  try {
    const { carName, userId, hours = 1 } = req.body;

    if (!carName || !userId)
      return res.status(400).json({ error: "carName and userId are required" });

    const pool = await getPool();

    await pool
      .request()
      .input("CarName", sql.NVarChar(101), carName)
      .input("UserId", sql.Int, Number(userId))
      .input("RentalNo", sql.Int, null)
      .input("Hours", sql.Int, Number(hours))
      .execute("AddRentalByCarName");

    const created = await pool
      .request()
      .input("UserId", sql.Int, Number(userId))
      .query(`
        SELECT TOP 1 *
        FROM Rentals
        WHERE UserId = @UserId
        ORDER BY RentalId DESC
      `);

    if (!created.recordset[0]) {
      return res.status(400).json({
        error:
          "Rental was not created. Possible reason: procedure returned without insert or INSTEAD OF trigger blocked insert.",
      });
    }

    res.status(201).json({
      ok: true,
      rental: created.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function testDbException(req, res, next) {
  try {
    const { userId, carId } = req.body;
    if (!userId || !carId)
      return res.status(400).json({ error: "userId and carId are required" });

    const pool = await getPool();

    const result = await pool
      .request()
      .input("UserId", sql.Int, Number(userId))
      .input("CarId", sql.Int, Number(carId))
      .query(`
        INSERT INTO Rentals (RentalNo, UserId, CarId, StartAt, EndAt, Hours, [Status], PricePerHourAtMoment, TotalAmount)
        VALUES (
          999999, @UserId, @CarId,
          DATEADD(HOUR, 2, CAST(CAST(GETDATE() AS date) AS datetime)),
          DATEADD(HOUR, 3, CAST(CAST(GETDATE() AS date) AS datetime)),
          1, N'Active', 100, 100
        );
      `);

    res.json({ ok: true, inserted: true, db: { rowsAffected: result.rowsAffected } });
  } catch (err) {
    next(err);
  }
}
