const express = require("express");
const NftModel = require("../../../model/nft.model");
const router = express.Router();

router.patch("/:address", async (req, res) => {
  try {
    const nft = await NftModel.find({
      contract: { address: req.params.address },
    })
      .lean()
      .exec();

    for (let i = 0; i < nft.length; i++) {
      nft[i].tokenId = Number(nft[i].tokenId);
      const changednft = await NftModel.findByIdAndUpdate(
        { _id: nft[i]._id },
        nft[i],
        { new: true }
      );

      console.log(changednft);
    }

    return res.status(200).json("updated token iDs");
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
