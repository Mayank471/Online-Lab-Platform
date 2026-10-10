import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

// Allow a comma separated list of origins via CLIENT_URL. On a single-domain
// deployment (client and API served from the same Vercel project) requests are
// same-origin, so this only matters for local dev and split deployments.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Browsers send an Origin header on same-origin POSTs too, so a request whose
// Origin matches the Host it was sent to must be allowed (the Vercel deployment).
app.use((req, res, next) =>
  cors({
    origin(origin, callback) {
      // No origin header: curl or a server-to-server call.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      try {
        if (new URL(origin).host === req.headers.host) return callback(null, true);
      } catch {
        // malformed Origin header, fall through to rejection
      }
      return callback(null, false);
    },
    credentials: true,
  })(req, res, next)
);

app.use(express.json());
app.use(cookieParser());

// Import Routes
import compilerRoutes from "./routes/compile.route.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import classroomRoutes from "./routes/classroom.routes.js";

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Every request needs the database, and on serverless each cold start begins
// without one, so connect lazily and reuse the cached connection after that.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log(`Database unavailable: ${error.message}`);
    res.status(503).json({ message: "Database unavailable" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/compile", compilerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/classroom", classroomRoutes);

export default app;
