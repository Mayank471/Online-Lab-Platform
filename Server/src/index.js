import path from "path";
import express from "express";
import dotenv from "dotenv";

import app from "./app.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Vercel serves the built client from its CDN, so this only applies when the
// whole app runs behind a single long-lived Node process.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
