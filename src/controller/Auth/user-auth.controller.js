require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../model/Auth/user-auth.model");

const WAValidator = require("wallet-address-validator");

const Alchemy_data = require("../../GET_DATA/Alchemy/getAccountNfts");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const signIn = async (req, res) => {
  try {
    var token;
    // check if it is an address
    var valid = WAValidator.validate(req.body.address, "ETH");

    if (!valid) {
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct address type",
      });
    }

    // OwnedNfts = await Alchemy_data.getNftsCollected(req.body.address);

    // var profile = { ownedNfts: OwnedNfts.ownedNfts };
    // check if the  address provided already exist
    var user = await User.findOne({ address: req.body.address });

    if (!user) {
      req.body.profile = {};
      user = await User.create(req.body);

      token = newToken(user);
    }
    // else we match the signature
    // const match = await user.checkPassword(req.body.address);

    // if not match then throw an error
    // if (!match){
    //     user = await User.create(req.body);
    // }

    // var newObj = {
    //   profile: { ownedNfts: OwnedNfts.ownedNfts },
    // };
    // user = await User.findOneAndUpdate({ address: req.body.address }, newObj, {
    //   new: true,
    // })
    //   .lean()
    //   .exec();
    // console.log(user);
    // if it matches then create the token

    token = newToken(user);
    // user.profile = profile;

    // return the user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

module.exports = { signIn };
