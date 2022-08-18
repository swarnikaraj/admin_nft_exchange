const express = require("express");
const NftModel = require("../model/nft.model");
const filterNfts = require("../../src/utils/filterNfts");
const router = express.Router();

const authenticatedRoute = require("../middleware/Auth/authenticate");

router.get("/:address", authenticatedRoute, async (req, res) => {
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

    console.log(defectedNfts, "defected");
    return res.status(201).send({ defectedNfts, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
