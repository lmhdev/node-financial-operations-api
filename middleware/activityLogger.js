const { ActivityLog } = require("../models");

const logActivity = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is available in the request object
  const action = `${req.method} ${req.originalUrl}`;
  const details = req.body;

  try {
    await ActivityLog.create({
      userId,
      action,
      details,
    });
    console.log("User activity logged successfully");
  } catch (error) {
    console.error("Failed to log user activity:", error);
  }

  next();
};

module.exports = logActivity;
