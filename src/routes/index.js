const express = require("express");

const userRouter = require("./user");
const itemRouter = require("./item");
const orderRouter = require("./order");
const paymentRouter = require("./payment");

const route = express.Router();

route.get("/", (req, res, next) => {
  res.json({ success: true, message: "This is api for Vehicle Rental" });
});

route.use("/user", userRouter);
route.use("/item", itemRouter);
route.use("/order", orderRouter);
route.use("/payment", paymentRouter);

route.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Wrong url, please check documentation",
  });
});

module.exports = route;