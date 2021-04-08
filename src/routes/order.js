const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.get("/", orderController.getAllOrders);
router.get("/conditions", orderController.getConditionOrders);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);


module.exports = router;