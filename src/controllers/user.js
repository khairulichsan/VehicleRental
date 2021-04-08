const userModel = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const create = await userModel.createNewUser(req.body);

    if (create.affectedRows > 0) {
      const newUser = await userModel.getUserById(create.insertId);

      return res.json({
        success: true,
        message: "Success create user",
        result: newUser,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create user",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.json({
      success: true,
      message: "Success get All users",
      result: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);

    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "ASC";

    const countUsers = await userModel.getCountUser({ search });

    const totalItem = countUsers[0].total;
    const totalPage = Math.ceil(countUsers[0].total / limit);

    if (totalPage >= page) {
      const users = await userModel.getConditionUsers({
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
          data: users,
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await userModel.updateUser(id, req.body);

    console.log(update);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateduser = await userModel.getUserById(id);

        return res.json({
          success: true,
          message: "Success updated user",
          result: updateduser,
        });
      }

      return res.status(400).json({
        success: false,
        message: "the input sent is the same",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed update user",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userById = await userModel.getUserById(id);

    if (!userById) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    await userModel.deleteUser(req.params.id);

    return res.json({
      status: true,
      message: "Success delete user",
      result: userById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};