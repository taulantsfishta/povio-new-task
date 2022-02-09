const jsonwebtoken = require("jsonwebtoken");
const config = require("../configs/config");
const authentification = require("../models/authentification");
const authorizationUserToken = (req, res, next) => {
  if (req.headers.authorization != undefined) {
    jsonwebtoken.default.verify(
      req.headers.authorization,
      config.default.TOKEN,
      (err, data) => {
        if (err) {
          res.status(404).json({ status: false, message: err.message });
        } else {
          // req.body.userData = data.id;
          // next();
          authentification.authentificationModel
            .finduserbyid(data.id)
            .then((result) => {
              req.body.userData = result[0];
              next();
            })
            .catch((err) => {
              return res.status(400).json({
                status: false,
                message: "User Not Found!",
              });
            });
        }
      }
    );
  } else {
    res
      .status(404)
      .json({ status: false, message: "Token Is Missing On Header!" });
  }
};
module.exports = { authorizationUserToken };
