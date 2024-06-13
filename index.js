// index.js
// Credit to ChatGPT for assistance and code comments.

"use strict";

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require('./models/User'); // Import the User model
const app = express();
const PORT = process.env.PORT || 3002;
const URI = process.env.URI;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
  console.log("Mongoose is connected.");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Route to register a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
