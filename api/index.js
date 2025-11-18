const app = require("../app");
const connectToDB = require("../config/db.config");
const serverless = require("serverless-http");

let isDBConnected = false;

connectToDB()
  .then(() => {
    console.log("Database connected");
    isDBConnected = true;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

const handler = serverless(app);

module.exports = async (req, res) => {
  if (!isDBConnected) {
    res.status(503).json({ message: "Database not connected yet" });
    return;
  }
  return handler(req, res);
};
