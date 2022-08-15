const express = require("express");
const NftModel = require("../../../model/nft.model");
const nft_middleware = require("../../../middleware/nft.middleware");
const router = express.Router();
//  this router needs list of defected nfts
// this router will updated tokenuRI

router.patch("updateDefected/tokenURI", async (req, res) => {
  try {
    var nftUpdated = [];
    const defectedNfts = req.body.nfts;

    
    for (let i = 0; i < defectedNfts.length; i++) {
      var tokenUri = await nft_middleware.getTokenUriForUpdateBlockChain(
        defectedNfts[i]
      );

      let newObj = {
        ...defectedNfts[i],
      };
      newObj.tokenUri.gateway = tokenUri;

      const nft = await NftModel.findOneAndUpdate(
        { _id: defectedNfts[i]._id },
        newObj,
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

module.exports = router;