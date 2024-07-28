const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
const authMiddleware = require("../middleware/authMiddleware");
const logActivity = require("../middleware/activityLogger");

router.use(authMiddleware);

router.post("/", logActivity, invoiceController.createInvoice);
router.get("/", logActivity, invoiceController.getInvoices);
router.put("/:id", invoiceController.updateInvoice);
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
