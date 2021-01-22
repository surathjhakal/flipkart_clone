const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controller/category");
const { adminMiddleware, requireSignin } = require("../controller/mainAuth");

router.post("/category/create", requireSignin, adminMiddleware, createCategory);
router.get(
  "/category/getCategory",
  requireSignin,
  adminMiddleware,
  getCategories
);

module.exports = router;
