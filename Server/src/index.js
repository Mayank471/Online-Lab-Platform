import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json())

// Import Routes
import compilerRoutes from "./routes/compile.route.js"; // ES6

const PORT = process.env.PORT || 5000;

// Database connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});
 // Routes
app.use("/api/compile", compilerRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
