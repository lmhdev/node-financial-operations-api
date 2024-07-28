const Expense = require("../models").Expense;
const crmService = require("../services/crmService");

exports.createExpense = async (req, res) => {
  try {
    const { clientId, description, amount, date } = req.body;
    const clientContact = crmService.getClientContact(clientId);
    if (!clientContact) {
      return res.status(404).json({ error: "Client not found in CRM" });
    }
    const expense = await Expense.create({ description, amount, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await expense.update(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
