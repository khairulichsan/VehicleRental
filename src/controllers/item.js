const itemModel = require("../models/item");

exports.createItem = async (req, res) => {
  try {
    const create = await itemModel.createNewItem(req.body);

    if (create.affectedRows > 0) {
      const newItem = await itemModel.getItemById(create.insertId);

      return res.json({
        success: true,
        message: "Success create Item",
        result: newItem,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create Item",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    return res.json({
      success: true,
      message: "Success get All Items",
      result: items,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionItems = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);

    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "ASC";

    const countItems = await itemModel.getCountItem({ search });

    const totalItem = countItems[0].total;
    const totalPage = Math.ceil(countItems[0].total / limit); 

    if (totalPage >= page) {
      const items = await itemModel.getConditionItems({
        limit,
        offset,
        search,
        sort,
        order,
      });

      return res.json({
        success: true,
        message: "Success get All Items",
        result: {
          page,
          totalItem: totalItem,
          totalPage: totalPage,
          data: items,
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

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await itemModel.updateItem(id, req.body);

    console.log(update);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedItem = await itemModel.getItemById(id);

        return res.json({
          success: true,
          message: "Success updated Item",
          result: updatedItem,
        });
      }

      return res.status(400).json({
        success: false,
        message: "the input sent is the same",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed update item",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const itemById = await itemModel.getItemById(id);

    if (!itemById) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }

    await itemModel.deleteItem(req.params.id);

    return res.json({
      status: true,
      message: "Success delete Item",
      result: itemById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};