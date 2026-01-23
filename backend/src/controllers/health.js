const mongoose = require("mongoose");

exports.healthCheck = (req, res) => {
  const state = mongoose.connection.readyState; 


  res.status(200).json({
    status: "ok",
    db: state === 1 ? "connected" : "not_connected",
    dbState: state,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
