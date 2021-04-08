const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");

router.get("/", paymentController.getAllPayments);
router.get("/conditions", paymentController.getConditionPayments);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);


module.exports = router;