const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");

router.get("/", itemController.getAllItems);
router.get("/conditions", itemController.getConditionItems);
router.post("/", itemController.createItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);


module.exports = router;