const express = require("express");
const UserModel = require("../model/Auth/user-auth.model");

const Alchemy_data = require("../GET_DATA/Alchemy/getAccountNfts");
const authenticate = require("../middleware/Admin-Auth/authenticate");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profile = await UserModel.findOne({ address: req.query.address });

    const ownedNfts = await Alchemy_data.getNftsCollected(req.query.address);
    var newprofile;
    if (!profile) {
      newprofile = {
        profile: { name: "No Name", ownedNfts: ownedNfts.ownedNfts },
      };
      newprofile.address = req.query.address;
      newprofile.asks = [];
      newprofile.bids = [];
    }

    return res.status(201).send({ newprofile });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
