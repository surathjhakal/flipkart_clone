const User = require("../models/user");
const jwt = require("jsonwebtoken");
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

exports.signin = (role) => {
  return function (req, res) {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) return res.status(400).json({ err });
      if (user) {
        if (user.authenticate(req.body.password) && user.role == role) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
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

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user;
  next();
};
