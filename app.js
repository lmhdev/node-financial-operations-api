const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const invoiceRoutes = require("./routes/invoice");
const expenseRoutes = require("./routes/expense");
const activityLogRoutes = require("./routes/activityLog");
const invoiceScheduler = require("./schedulers/invoiceScheduler");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4567;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/activity-logs", activityLogRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      invoiceScheduler;
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
