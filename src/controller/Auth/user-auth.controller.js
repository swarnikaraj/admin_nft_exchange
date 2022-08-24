require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../model/Auth/user-auth.model");

const WAValidator = require('wallet-address-validator');
 


const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};



const signIn = async (req, res) => {
  try {
   var token;
    // check if it is an address 
    var valid = WAValidator.validate(req.body.address, 'ETH');

    if(!valid){
        return res.status(400).json({
            status: "failed",
            message: " Please provide correct address type",
          });
    }
    // check if the  address provided already exist
    let user = await User.findOne({ address: req.body.address});

    // if it does not exist then throw an error
    if (!user){
    user = await User.create(req.body);

    // we will create the token
    token = newToken(user);

    // return the user and the token
    // res.status(201).json({ user, token });
    }
    // else we match the address
    // const match = await user.checkPassword(req.body.address);

    // if not match then throw an error
    // if (!match){
    //     user = await User.create(req.body);
    // }
   

    // if it matches then create the token
     token = newToken(user);

    // return the user and the token
    res.status(201).json({ user, token });


  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

module.exports = {  signIn };
