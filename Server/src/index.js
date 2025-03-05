import express from "express";
import mongoose from "mongoose";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import Routes
import compilerRoutes from "./routes/compile.route.js"; // ES6

const PORT = process.env.PORT || 5000;

// Database connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// Basic route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Coding Platform API');
// });

app.get("/", (req, res) => {
  res.send("API is running...");
});
 // Routes
app.use("/api/compile", compilerRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
