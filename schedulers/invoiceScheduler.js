const cron = require("node-cron");
const Invoice = require("../models").Invoice;
const amsService = require("../services/amsService");

const generateInvoices = async () => {
  try {
    const amsData = amsService.getAMSData();
    for (const client of amsData) {
      await Invoice.create({
        description: `Automated Invoice for ${client.clientName}`,
        amount: client.invoiceAmount,
        dueDate: client.dueDate,
      });
    }
    console.log("Automated invoices generated successfully");
  } catch (error) {
    console.error("Failed to generate automated invoices:", error);
  }
};

// Schedule the task to run at 00:00 on the 1st of every month
cron.schedule("0 0 * * 1'", generateInvoices, {
  scheduled: true,
  timezone: "Etc/GMT-7",
});
