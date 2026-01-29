const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NODE_ENV } = require("./config/env");

const healthRoutes = require("./routes/health_routes");
const authRoutes=require("./routes/auth_routes")
const job_routes=require("./routes/job_routes")

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/health", healthRoutes);
app.use("/auth",authRoutes);
app.use("/jobs",job_routes);
app.use("/api/ai", require("./routes/ai_routes"));


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
