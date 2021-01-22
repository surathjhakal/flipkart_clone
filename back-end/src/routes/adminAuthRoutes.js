const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/mainAuth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/mainAuth");

router.post(
  "/admin/signup",
  validateSignupRequest,
  isRequestValidated,
  signup("admin")
);
router.post(
  "/admin/signin",
  validateSigninRequest,
  isRequestValidated,
  signin("admin")
);

module.exports = router;
