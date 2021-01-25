const express = require("express");
const router = express.Router();
const { addItemToCart } = require("../controller/cart");
const { userMiddleware, requireSignin } = require("../controller/mainAuth");

router.post("/user/cart/add", requireSignin, userMiddleware, addItemToCart);
// router.get(
//   "/category/getCategory",
//   requireSignin,
//   userMiddleware,
//   getCategories
// );

module.exports = router;
