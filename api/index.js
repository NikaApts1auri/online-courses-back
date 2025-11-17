const app = require("../src/app");
const connectToDB = require("../src/config/db.config");

let isDBConnected = false;

connectToDB()
  .then(() => {
    isDBConnected = true;
    console.log("Database connected");
  })
  .catch((err) => {
    isDBConnected = false;
    console.error("Database connection failed:", err);
  });

module.exports = (req, res) => {
  if (!isDBConnected) {
    res.status(503).json({ message: "Database not connected yet" });
    return;
  }

  app(req, res);
};
