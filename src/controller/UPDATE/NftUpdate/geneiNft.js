const express = require("express");
const NftModel = require("../../../model/nft.model");
const Genei_Data = require("../../../GET_DATA/Genie/nft.google_img.data");

const router = express.Router();
router.patch("/:address", async (req, res) => {
  try {
    const nftData = await Genei_Data.getNfts(req.params.address);
    if (!nftData) {
      return res.status(400).json("Genei api is not working");
    }

    const nft = await NftModel.find({
      contract: { address: req.params.address },
    })
      .lean()
      .exec();

    for (let i = 0; i < nft.length; i++) {
        
      nft[i].media[0]["google_img"] = nftData[nft[i].tokenId].google_img;
      nft[i].rarity = nftData[nft[i].tokenId].rarity;
      const changednft = await NftModel.findByIdAndUpdate(
        { _id: nft[i]._id },
        nft[i],
        { new: true }
      );

      console.log(changednft);
    }

    return res.status(200).json("Updated Nfts rarity and media");
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});
module.exports = router;
