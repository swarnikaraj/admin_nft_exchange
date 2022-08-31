const express = require("express");
const UserModel = require("../model/Auth/user-auth.model");

const Alchemy_data = require("../GET_DATA/Alchemy/getAccountNfts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const account = await UserModel.findOne({ address: req.query.address });

    const ownedNfts = await Alchemy_data.getNftsCollected(req.query.address);

    account.profile = { ...account.profile, ownedNfts: ownedNfts.ownedNfts };
    return res.status(201).send({ account });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.patch("/", async (req, res) => {
  try {
    const account = await UserModel.findOneAndUpdate(
      { address: req.query.address },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    return res.status(201).send({ account });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const account = await UserModel.findOneAndDelete({
      address: req.query.address,
    });
    return res.status(201).send({ account });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
