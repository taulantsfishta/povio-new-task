const db = require("../configs/db");
var createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
var updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
module.exports = {
  finduser: (userData) => {
    return new Promise((resolve, reject) => {
      db.default.query(
        "SELECT * FROM user WHERE name= ?",
        [userData.name],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  finduserbyid: (id) => {
    return new Promise((resolve, reject) => {
      db.default.query(
        "SELECT * FROM user WHERE id= ?",
        [id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  createuserprofile: (userData) => {
    return new Promise((resolve, reject) => {
      db.default.query(
        "INSERT INTO user (name,password,created_at,updated_at) VALUES(?,?,?,?)",
        [userData.name, userData.password, createdAt, updatedAt],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  updateuserpassword: (userData, newPassword) => {
    return new Promise((resolve, reject) => {
      db.default.query(
        "UPDATE user SET password= ?,updated_at = ? WHERE id = ?",
        [newPassword, updatedAt, userData.id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
};
