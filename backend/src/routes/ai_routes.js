const express = require("express");
const rateLimit = require("express-rate-limit");
const { parseJob } = require("../controllers/ai_controller");

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10, // per IP per day (free tier friendly)
  standardHeaders: true,
  legacyHeaders: false
});

router.post("/parse-job", aiLimiter, parseJob);

module.exports = router;
