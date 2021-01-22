const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/mainAuth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/mainAuth");

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  signup("user")
);
router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  signin("user")
);

module.exports = router;
