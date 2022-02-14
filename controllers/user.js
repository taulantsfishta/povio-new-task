const {
  finduserbyid,
  likesofuser,
  checkiflikeExist,
  likeauser,
  unlikeauser,
  finduserlike,
} = require("../models/user");
const userschema = require("../schemas/user");

const errorHandler = (res, errMessage) => {
  return res.status(404).json({ status: false, message: errMessage });
};

const userLikesAndUsername = (req, res, next) => {
  finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        errorHandler(res, "User Not Found!");
      } else {
        likesofuser(req.params.id)
          .then((likes) => {
            if (!(Object.keys(likes).length > 0)) {
              let userLikesSchema = userschema.userLikes(userExist[0], 0);
              return res
                .status(200)
                .json({ status: true, message: userLikesSchema });
            } else {
              let userLikesSchema = userschema.userLikes(
                userExist[0],
                likes.length
              );
              return res
                .status(200)
                .json({ status: true, message: userLikesSchema });
            }
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

const likeAUser = (req, res, next) => {
  finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        errorHandler(res, "User Not Found!");
      } else {
        checkiflikeExist(req.body.userData.id, req.params.id)
          .then((likeExist) => {
            if (Object.keys(likeExist).length > 0) {
              errorHandler(res, "Like Exist!");
            } else {
              likeauser(req.body.userData.id, req.params.id)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "Like Is Registred",
                  });
                })
                .catch((err) => {
                  errorHandler(res, err);
                });
            }
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

const unLikeAUser = (req, res, next) => {
  finduserbyid(req.params.id)
    .then((userExist) => {
      if (!(Object.keys(userExist).length > 0)) {
        errorHandler(res, "User Not Found!");
      } else {
        checkiflikeExist(req.body.userData.id, req.params.id)
          .then((likeExist) => {
            if (!(Object.keys(likeExist).length > 0)) {
              errorHandler(res, "Like Doesn't Exist!");
            } else {
              unlikeauser(req.body.userData.id, req.params.id)
                .then((result) => {
                  return res.status(200).json({
                    status: true,
                    message: "Unlike Is Registred",
                  });
                })
                .catch((err) => {
                  errorHandler(res, err);
                });
            }
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

const getMostLikedUsers = (req, res, next) => {
  finduserlike()
    .then((userLike) => {
      if (!(Object.keys(userLike).length > 0)) {
        errorHandler(res, "No Like Found");
      } else {
        let userNumberLikesSchema = new Array();
        userLike.forEach((element) => {
          userNumberLikesSchema.push(userschema.userNumberOfLikes(element));
        });
        return res.json({ status: true, message: userNumberLikesSchema });
      }
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

module.exports = {
  userLikesAndUsername,
  likeAUser,
  unLikeAUser,
  getMostLikedUsers,
};
