const Invoice = require("../models").Invoice;
const amsService = require("../services/amsService");
const sendEmail = require("../config/nodemailer");

exports.createInvoice = async (req, res) => {
  try {
    const { clientId, description, amount, dueDate } = req.body;
    const invoiceDetails = amsService.getInvoiceDetails(clientId);
    if (!invoiceDetails) {
      return res.status(404).json({ error: "Client not found in AMS" });
    }
    const invoice = await Invoice.create({ description, amount, dueDate });
    const emailContent = `Dear ${invoiceDetails.clientName},\n\nAn invoice has been generated for you.\n\nDescription: ${description}\nAmount: $${amount}\nDue Date: ${dueDate}\n\nThank you.`;
    await sendEmail(
      invoiceDetails.email,
      "New Invoice Generated",
      emailContent
    );

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const invoices = await Invoice.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).json({
      total: invoices.count,
      pages: Math.ceil(invoices.count / limit),
      currentPage: page,
      invoices: invoices.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    await invoice.update(req.body);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Failed to update invoice" });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    await invoice.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete invoice" });
  }
};
