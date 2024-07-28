module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Expense;
};
