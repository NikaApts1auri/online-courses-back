const express = require("express");
const connectToDB = require("./config/db.config");
const app = require("./app");

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
