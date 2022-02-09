const authentification = require("../models/authentification");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../configs/config");
const bcrypt = require("bcrypt");
const signUp = (req, res, next) => {
  authentification.authentificationModel
    .finduser(req.body)
    .then((userExist) => {
      if (Object.keys(userExist).length > 0) {
        return res.status(404).json({ status: false, message: "User Exist!" });
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hashpassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashpassword;
        authentification.authentificationModel
          .createuserprofile(req.body)
          .then((userCreated) => {
            return res
              .status(200)
              .json({ status: true, message: "User Is Created!" });
          })
          .catch((err) => {
            return res.status(400).json({ status: false, message: err });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
  // return res.status(200).json('AUTH');
};
const login = (req, res, next) => {
  authentification.authentificationModel
    .finduser(req.body)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "Username Not Found!" });
      } else {
        bcrypt.compare(
          req.body.password,
          userExist[0].password,
          function (err, isMatch) {
            if (err) {
              return res.status(400).json({
                status: false,
                message: err,
              });
            } else if (!isMatch) {
              return res.status(404).json({
                status: false,
                message: "Password Is Incorrect!",
              });
            } else {
              const userToken = jsonwebtoken.default.sign(
                { id: userExist[0].id },
                config.default.TOKEN
              );
              return res.status(200).json({
                token: userToken,
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
const me = (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: req.body.userData,
  });
};
const updatePassword = (req, res, next) => {
  authentification.authentificationModel
    .finduserbyid(req.body.userData.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "User Not Found!" });
      } else {
        bcrypt.compare(
          req.body.old_password,
          userExist[0].password,
          function (err, isMatch) {
            if (err) {
              return res.status(400).json({
                status: false,
                message: err,
              });
            } else if (!isMatch) {
              return res.status(404).json({
                status: false,
                message: "old_password is incorrect",
              });
            } else {
              var salt = bcrypt.genSaltSync(10);
              var hashpassword = bcrypt.hashSync(req.body.new_password, salt);
              req.body.password = hashpassword;
              authentification.authentificationModel
                .updateuserpassword(req.body.userData, req.body.password)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "User Password Has Been Updated!",
                  });
                })
                .catch((err) => {
                  return res.status(400).json({
                    status: false,
                    message: err,
                  });
                });
            }
          }
        );
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
module.exports = { signUp, login, me, updatePassword };
