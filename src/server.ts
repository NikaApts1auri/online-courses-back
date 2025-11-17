// const express = require("express");
// const connectToDB = require("./config/db.config");
// const app = require("./app");

// const PORT = process.env.PORT || 3000;

// connectToDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });
const app = require("./app");
const connectToDB = require("./config/db.config");

let isDBConnected = false;

connectToDB()
  .then(() => {
    console.log("Database connected");
    isDBConnected = true;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// CommonJS export for Vercel
module.exports = (req, res) => {
  if (!isDBConnected) {
    res.status(503).json({ message: "Database not connected yet" });
    return;
  }
  app(req, res);
};
