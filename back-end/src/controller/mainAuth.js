const User = require("../models/user");
const jwt = require("jsonwebtoken");

//This is used for a sign up of user or admin ,there is a parameter to pass for who do you want the sign up process
exports.signup = (role) => {
  return function (req, res) {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          message: `${role} already registered`,
        });
      }
      const { firstName, lastName, email, password } = req.body;
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
        role: role,
      });
      _user.save((err, data) => {
        if (err) {
          return res.status(400).json({ err });
        }
        if (data) {
          return res.status(201).json({
            message: `${role} Created Successfully`,
          });
        }
      });
    });
  };
};

//This is used for a sign in of user or admin ,there is a parameter to pass for who do you want the sign in process
exports.signin = (role) => {
  return function (req, res) {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) return res.status(400).json({ err });
      if (user) {
        if (user.authenticate(req.body.password) && user.role == role) {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          const { _id, firstName, lastName, email, role, fullName } = user;
          res.status(200).json({
            token,
            user: {
              _id,
              firstName,
              lastName,
              email,
              role,
              fullName,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      } else {
        return res.status(400).json({ message: `There is no such ${role}` });
      }
    });
  };
};

//This is a middleware for checking that is the user or admin logged in for doing any action related to them..
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

//These two middleware function is made for checking that the role is correct for their respected jobs as a example :
// admin can not add product to cart as it does not have the permission

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};
