const {
  finduser,
  finduserbyid,
  createuserprofile,
  updateuserpassword,
} = require("../models/authentification");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../configs/config");
const bcrypt = require("bcrypt");

const errorHandler = (res, errMessage) => {
  return res.status(404).json({ status: false, message: errMessage });
};

const signUp = (req, res, next) => {
  finduser(req.body)
    .then((userExist) => {
      if (Object.keys(userExist).length > 0) {
        errorHandler(res, "User Exist!");
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hashpassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashpassword;
        createuserprofile(req.body)
          .then((userCreated) => {
            return res
              .status(200)
              .json({ status: true, message: "User Is Created!" });
          })
          .catch((err) => {
            errorHandler(res, err);
          });
      }
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const login = (req, res, next) => {
  finduser(req.body)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        errorHandler(res, "Username Not Found!");
      } else {
        bcrypt.compare(
          req.body.password,
          userExist[0].password,
          function (err, isMatch) {
            if (err) {
              errorHandler(res, err);
            } else if (!isMatch) {
              errorHandler(res, "Password Is Incorrect!");
            } else {
              const userToken = jsonwebtoken.sign(
                { id: userExist[0].id },
                config.TOKEN
              );
              return res.status(200).json({
                status: true,
                token: userToken,
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const me = (req, res, next) => {
  if (!(Object.keys(userExist).length > 0)) {
    errorHandler(res, "User Not Found!");
  } else {
    return res.status(200).json({
      status: true,
      message: req.body.userData,
    });
  }
};

const updatePassword = (req, res, next) => {
  finduserbyid(req.body.userData.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        errorHandler(res, "User Not Found!");
      } else {
        bcrypt.compare(
          req.body.old_password,
          userExist[0].password,
          function (err, isMatch) {
            if (err) {
              errorHandler(res, err);
            } else if (!isMatch) {
              errorHandler(res, "old_password is incorrect");
            } else {
              var salt = bcrypt.genSaltSync(10);
              var hashpassword = bcrypt.hashSync(req.body.new_password, salt);
              req.body.password = hashpassword;
              updateuserpassword(req.body.userData, req.body.password)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "User Password Has Been Updated!",
                  });
                })
                .catch((err) => {
                  errorHandler(res, err);
                });
            }
          }
        );
      }
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

module.exports = { signUp, login, me, updatePassword };
