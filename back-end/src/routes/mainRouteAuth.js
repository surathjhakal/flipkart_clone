const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controller/mainAuth");

router.post("/signup", signup("user"));
router.post("/signin", signin("user"));

router.post("/admin/signup", signup("admin"));
router.post("/admin/signin", signin("admin"));

module.exports = router;
