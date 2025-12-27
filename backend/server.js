import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import carsRoutes from "./routes/cars.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import usersRoutes from "./routes/users.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger config
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CarSharing API (LB3)",
      version: "1.0.0",
      description:
        "REST API for laboratory work №3 (procedures, functions, DB exceptions)",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/cars", carsRoutes);
app.use("/api/rentals", rentalsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  const message =
    err?.originalError?.info?.message ||
    err?.message ||
    "Server error";

  const number = err?.originalError?.info?.number || err?.number;
  const status = number >= 50000 ? 400 : 500;

  res.status(status).json({
    error: message,
    code: number || null,
  });
});

app.listen(port, () => {
  console.log(`API running  → http://localhost:${port}`);
  console.log(`Swagger UI → http://localhost:${port}/api-docs`);
});
