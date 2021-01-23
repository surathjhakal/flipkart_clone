const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price: price,
    description: description,
    productPictures,
    category,
    createdBy: req.user._id,
    quantity,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ err });
    if (product) {
      res.status(200).json({ product });
    }
  });
};
