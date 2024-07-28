module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define("ActivityLog", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  return ActivityLog;
};
