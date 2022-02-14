const express = require("express");
const authenticationController = require("../controllers/authentication");
const userController = require("../controllers/user");
const jwttoken = require("../controllers/jwttoken");
const { signup, userId, validateuser } = require("../validations/user");
const {
  signupauth,
  updatePassword,
  validateauth,
} = require("../validations/authentification");
const router = express.Router();

// // @desc         Welcome
// // @route        GET  /
router.get("/", (req, res) => {
  res.status(200).json("WELCOME TO POVIO TASK");
});

// // @desc         Auth
// // @route        POST  /signup
router.post("/signup", signup(), validateauth, authenticationController.signUp);
// @route        POST  /login
router.post("/login", authenticationController.login);
// // @route        GET  /me
router.get("/me", jwttoken.authorizationUserToken, authenticationController.me);
// // @route        POST  /me/update-password
router.put(
  "/me/update-password",
  jwttoken.authorizationUserToken,
  updatePassword(),
  validateauth,
  authenticationController.updatePassword
);
// // @desc         USER
// // @route        GET  /user/:id/
router.get(
  "/user/:id/",
  userId(),
  validateuser,
  userController.userLikesAndUsername
);
// // @route        GET  /user/:id/like
router.get(
  "/user/:id/like",
  jwttoken.authorizationUserToken,
  userId(),
  validateuser,
  userController.likeAUser
);
// // @route        GET  /user/:id/unlike
router.get(
  "/user/:id/unlike",
  jwttoken.authorizationUserToken,
  userId(),
  validateuser,
  userController.unLikeAUser
);
// // @route        GET  /most-liked
router.get("/most-liked", userController.getMostLikedUsers);
// @desc         404
router.use("*", (req, res) => {
  res.status(404).send({ status: false, message: "endpoint not found!" });
});
module.exports = router;
