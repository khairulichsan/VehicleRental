const db = require("../helpers/db");

exports.createNewOrder = (data) => {


  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO order_item (${Object.keys(data)}) VALUES (${Object.values(
        data
      ).map((item) => `"${item}"`)})`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM order_item WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM order_item", (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};


exports.getConditionOrders = (condition) => {
  return new Promise((resolve, reject) => {
   
    db.query(
      `SELECT * FROM order_item WHERE name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getCountOrder = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total FROM order_item WHERE name LIKE "%${condition.search}%"`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.updateOrder = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE order_item SET ${keys.map(
        (key, index) => `${key} = "${values[index]}"`
      )} WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM order_item WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};