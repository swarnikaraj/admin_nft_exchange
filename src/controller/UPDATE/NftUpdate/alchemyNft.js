const express = require("express");
const NftModel = require("../../../model/nft.model");
const nft_middleware = require("../../../middleware/nft.middleware");
const router = express.Router();
//  this router needs list of defected nfts
// this will check each field and update them
router.patch("updateDefected", async (req, res) => {
  try {
    var nftUpdated = [];
    const defectedNfts = req.body.nfts;

    if (defectedNfts.length > 0) {
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
    } else {
      return res.status(200).send("Invalid defected nfts passed");
    }
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
