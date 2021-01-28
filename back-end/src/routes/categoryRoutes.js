const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controller/category");
const { adminMiddleware, requireSignin } = require("../controller/mainAuth");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

// console.log(path.join(path.dirname(__dirname)));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);
router.get(
  "/category/getCategory",
  requireSignin,
  adminMiddleware,
  getCategories
);

module.exports = router;
