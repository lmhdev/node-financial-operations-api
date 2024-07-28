module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Invoice;
};
