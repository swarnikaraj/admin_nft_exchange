const express = require("express");
const NftModel = require("../../../model/nft.model");
const nft_middleware = require("../../../middleware/nft.middleware");

//  this router needs list of defected nfts
router.patch("updateDefected", async (req, res) => {
  try {
    var nftUpdated = [];
    const defectedNfts = req.body.nfts;

    for (let i = 0; i < defectedNfts.length; i++) {
      var newNftObj = await nft_middleware.getNftsForUpdate(defectedNfts[i]);

      const nft = await NftModel.findOneAndUpdate(
        { _id: defectedNfts[i]._id },
        newNftObj,
        { new: true }
      )
        .lean()
        .exec();
      console.log(nft);

      nftUpdated.push(nft);
    }

    return res.status(200).json({ nftUpdated });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});
