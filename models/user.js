const db = require("../helpers/db");

exports.createNewUser = (data) => {


  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (${Object.keys(data)}) VALUES (${Object.values(
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

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user", (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};


exports.getConditionUsers = (condition) => {
  return new Promise((resolve, reject) => {
   
    db.query(
      `SELECT * FROM user WHERE name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getCountUser = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total FROM user WHERE name LIKE "%${condition.search}%"`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE user SET ${keys.map(
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

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM user WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};