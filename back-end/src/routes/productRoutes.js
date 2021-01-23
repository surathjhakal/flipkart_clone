const express = require("express");
const router = express.Router();
// const { createCategory, getCategories } = require("../controller/category");
const { adminMiddleware, requireSignin } = require("../controller/mainAuth");
const { createProduct } = require("../controller/product");
const multer = require("multer");
// const upload = multer({ dest: "src/uploads/" });
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
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

// router.get(
//   "/product/getCategory",
//   requireSignin,
//   adminMiddleware,
//   getCategories
// );

module.exports = router;
