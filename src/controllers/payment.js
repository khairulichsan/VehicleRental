const paymentModel = require("../models/payment");

//payment has not been fixed

exports.createPayment = async (req, res) => {
  try {
    const create = await paymentModel.createNewPayment(req.body);

    if (create.affectedRows > 0) {
      const newPayment = await paymentModel.getPaymentById(create.insertId);

      return res.json({
        success: true,
        message: "Success create payment",
        result: newPayment,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create payment",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const users = await paymentModel.getAllPayments();
    return res.json({
      success: true,
      message: "Success get All Payments",
      result: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionPayments = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);

    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "ASC";

    const countPayments = await paymentModel.getCountPayment({ search });

    const totalItem = countPayments[0].total;
    const totalPage = Math.ceil(countPayments[0].total / limit); 

    if (totalPage >= page) {
      const payments = await paymentModel.getConditionPayments({
        limit,
        offset,
        search,
        sort,
        order,
      });

      return res.json({
        success: true,
        message: "Success get All payments",
        result: {
          page,
          totalItem: totalItem,
          totalPage: totalPage,
          data: payments,
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

exports.updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await paymentModel.updatePayment(id, req.body);

    console.log(update);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedPayment = await paymentModel.getPaymentById(id);

        return res.json({
          success: true,
          message: "Success updated Payment",
          result: updatedPayment,
        });
      }

      return res.status(400).json({
        success: false,
        message: "the input sent is the same",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed update Payment",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentById = await paymentModel.getPaymentById(id);

    if (!paymentById) {
      return res.status(404).json({
        success: false,
        message: "payment not found",
      });
    }

    await paymentModel.deletepayment(req.params.id);

    return res.json({
      status: true,
      message: "Success delete payment",
      result: paymentById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};