require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../../model/Auth/admin-auth.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};



const register = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await Admin.findOne({ email: req.body.email }).lean().exec();

    // if it already exists then throw an error
    if (user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide a different email address",
      });

    // else we will create the user we will hash the password as plain text password is harmful
    user = await Admin.create(req.body);

    // we will create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await Admin.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // else we match the password
    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // if it matches then create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

module.exports = { register, login };
