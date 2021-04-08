const db = require("../helpers/db");

exports.createNewPayment = (data) => {


  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Payment (${Object.keys(data)}) VALUES (${Object.values(
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

exports.getPaymentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM payment WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllPayments = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM payment", (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};


exports.getConditionPayments = (condition) => {
  return new Promise((resolve, reject) => {
   
    db.query(
      `SELECT * FROM payment WHERE name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getCountPayment = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total FROM payment WHERE name LIKE "%${condition.search}%"`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.updatePayment = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE payment SET ${keys.map(
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

exports.deletePayment = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM payment WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};