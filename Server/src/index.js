import express from "express";
import cookieParser from 'cookie-parser';
import {connectDB} from "./lib/db.js";

import cors from "cors";
import dotenv from "dotenv";
import compilerRoutes from "./routes/compile.route.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json())
app.use(cookieParser());
// Import Routes
import compilerRoutes from "./routes/compile.route.js"; // ES6
import authRoutes from "./routes/auth.routes.js";

// Routes
app.use("/api/users", userRoutes);
app.use("/api/compile", compilerRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

 // Routes
app.use("/api/auth", authRoutes);
app.use("/api/compile", compilerRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB();
});
