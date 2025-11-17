const { VercelRequest, VercelResponse } = require("@vercel/node");
const app = require("../src/app");
const connectToDB = require("../src/config/db.config");

let isDBConnected = false;

connectToDB()
  .then(() => {
    isDBConnected = true;
  })
  .catch(() => {
    isDBConnected = false;
  });

module.exports = function (req, res) {
  if (!isDBConnected) {
    return res.status(503).json({ message: "Database not connected yet" });
  }
  app(req, res);
};
