const user_1 = require("../models/user");
const user_2 = require("../schemas/user");
const userLikesAndUsername = (req, res, next) => {
  user_1.userModel
    .finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "User Not Found!" });
      } else {
        user_1.userModel
          .likesofuser(req.params.id)
          .then((likes) => {
            if (!(Object.keys(likes).length > 0)) {
              return res
                .status(404)
                .json({ status: false, message: "Like Not Found!" });
            } else {
              let userLikesSchema = user_2.default.userLikes(
                userExist[0],
                likes.length
              );
              return res
                .status(200)
                .json({ status: true, message: userLikesSchema });
            }
          })
          .catch((err) => {
            return res.status(400).json({
              status: false,
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
const likeAUser = (req, res, next) => {
  user_1.userModel
    .finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "User Not Found!" });
      } else {
        user_1.userModel
          .checkiflikeExist(req.body.userData.id, req.params.id)
          .then((likeExist) => {
            if (Object.keys(likeExist).length > 0) {
              return res
                .status(404)
                .json({ status: false, message: "Like Exist!" });
            } else {
              user_1.userModel
                .likeauser(req.body.userData.id, req.params.id)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "Like Is Registred",
                  });
                })
                .catch((err) => {
                  return res.status(400).json({
                    status: false,
                    message: err,
                  });
                });
            }
          })
          .catch((err) => {
            return res.status(400).json({
              status: false,
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
const unLikeAUser = (req, res, next) => {
  user_1.userModel
    .finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "User Not Found!" });
      } else {
        user_1.userModel
          .checkiflikeExist(req.body.userData.id, req.params.id)
          .then((likeExist) => {
            if (!(Object.keys(likeExist).length > 0)) {
              return res
                .status(404)
                .json({ status: false, message: "Like Doesn't Exist!" });
            } else {
              user_1.userModel
                .unlikeauser(req.body.userData.id, req.params.id)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "Unlike Is Registred",
                  });
                })
                .catch((err) => {
                  return res.status(400).json({
                    status: false,
                    message: err,
                  });
                });
            }
          })
          .catch((err) => {
            return res.status(400).json({
              status: false,
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
const getMostLikedUsers = (req, res, next) => {
  user_1.userModel
    .finduserlike()
    .then((userLike) => {
      if (!(Object.keys(userLike).length > 0)) {
        return res
          .status(404)
          .json({ status: false, message: "No Like Found" });
      } else {
        let userNumberLikesSchema = new Array();
        userLike.forEach((element) => {
          userNumberLikesSchema.push(user_2.default.userNumberOfLikes(element));
        });
        return res.json({ status: true, message: userNumberLikesSchema });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err,
      });
    });
};
module.exports = {
  userLikesAndUsername,
  likeAUser,
  unLikeAUser,
  getMostLikedUsers,
};
