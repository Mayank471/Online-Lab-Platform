import express from "express";
import mongoose from "mongoose";
import {connectDB} from "./lib/db.js";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json())

// Import Routes
import compilerRoutes from "./routes/compile.route.js"; // ES6
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;


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
