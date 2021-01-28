const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

//This function is used to create a new product
exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  //This thing is done for passing the body data into a schema or you can say it is creating a object of that
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

  // This thing is done for saving the data to the database
  product.save((err, product) => {
    if (err) return res.status(400).json({ err });
    if (product) {
      res.status(200).json({ product });
    }
  });
};
