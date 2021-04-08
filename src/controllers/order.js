const orderModel = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const create = await orderModel.createNewOrder(req.body);

    if (create.affectedRows > 0) {
      const newOrder = await orderModel.getOrderById(create.insertId);

      return res.json({
        success: true,
        message: "Success create order",
        result: newOrder,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create order",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    return res.json({
      success: true,
      message: "Success get All orders",
      result: orders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionOrders = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);

    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "ASC";

    const countOrders = await orderModel.getCountOrder({ search });

    const totalItem = countOrders[0].total;
    const totalPage = Math.ceil(countOrders[0].total / limit); 

    if (totalPage >= page) {
      const orders = await orderModel.getConditionOrders({
        limit,
        offset,
        search,
        sort,
        order,
      });

      return res.json({
        success: true,
        message: "Success get All users",
        result: {
          page,
          totalItem: totalItem,
          totalPage: totalPage,
          data: orders,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await orderModel.updateOrder(id, req.body);

    console.log(update);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedOrder = await orderModel.getOrderById(id);

        return res.json({
          success: true,
          message: "Success updated order",
          result: updatedOrder,
        });
      }

      return res.status(400).json({
        success: false,
        message: "the input sent is the same",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed update order",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderById = await OrderModel.getOrderById(id);

    if (!orderById) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    await orderModel.deleteOrder(req.params.id);

    return res.json({
      status: true,
      message: "Success delete order",
      result: orderById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};