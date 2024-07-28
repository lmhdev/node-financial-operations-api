const express = require("express");
const router = express.Router();
const activityLogController = require("../controllers/activityLogController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, activityLogController.getActivityLog);

module.exports = router;
