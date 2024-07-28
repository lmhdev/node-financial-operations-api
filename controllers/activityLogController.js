const ActivityLog = require("../models").ActivityLog;

exports.getActivityLog = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
};
