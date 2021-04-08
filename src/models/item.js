const db = require("../helpers/db");

exports.createNewItem = (data) => {


  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO item (${Object.keys(data)}) VALUES (${Object.values(
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

exports.getItemById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM item WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM item", (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};


exports.getConditionItems = (condition) => {
  return new Promise((resolve, reject) => {
   
    db.query(
      `SELECT * FROM item WHERE name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getCountItem = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total FROM item WHERE name LIKE "%${condition.search}%"`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.updateItem = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE item SET ${keys.map(
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

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM item WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};