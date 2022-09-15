const express = require("express");
const NftModel = require("../model/nft.model");
const filterNfts = require("../../src/utils/filterNfts");
const router = express.Router();

const admin_authenticatedRoute = require("../middleware/Admin-Auth/authenticate");

router.get("/:address", async (req, res) => {
  try {
    console.log("runnin controller", req.params.address);
    const nft = await NftModel.find({
      contract: { address: req.params.address },
    })
      .lean()
      .exec();

    totalNfts = Math.ceil(
      await NftModel.find({
        contract: { address: req.params.address },
      }).countDocuments()
    );
    console.log(totalNfts, "tote");

    defectedNfts = await filterNfts.nftArrayCheck(nft);
    var len = defectedNfts.length;
    console.log(defectedNfts, "defected");
    return res.status(201).send({ len, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
