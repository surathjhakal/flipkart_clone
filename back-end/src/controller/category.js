const Category = require("../models/category");
const slugify = require("slugify");

//This function is used to get all the categories and sub categories
const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

//This function is used to create a new category
exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) return res.status(400).json({ err });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

//This function used for getting all the catgories present there
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) return res.status(400).json({ err });
    if (categories) {
      const categoryList = createCategories(categories);

      res.status(200).json({ categoryList });
    }
  });
};
