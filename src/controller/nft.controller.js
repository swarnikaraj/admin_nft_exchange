const express = require("express");
const NftModel = require("../model/nft.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;
    const skip = (page - 1) * size;

    const nft = await Nftmodel.find()
      .skip(skip)
      .limit(size)
      // .sort([['index', 1]])
      .lean()
      .exec();

    totalPages = Math.ceil((await NftModel.find().countDocuments()) / size);

    return res.status(201).send({ nft, totalPages });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:address", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;

    const skip = (page - 1) * size;

    const initialTokens = await NftModel.find({
      contract: { address: req.params.address },
    }).populate("Collection")
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

for(let i=0;i<initialTokens.length;i++){

  initialTokens[i].collection=  initialTokens[i].Collection;
}

    totalPages = Math.ceil(
      (await NftModel.find({
        contract: { address: req.params.address },
      }).countDocuments()) / size
    );

    totalNfts = await NftModel.find({
      contract: { address: req.params.address },
    }).countDocuments();

    return res.status(201).send({ initialTokens, totalPages, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:address/:tokenId", async (req, res) => {
  try {
    const nft = await NftModel.findOne({
      contract: { address: req.params.address },
      tokenId: req.params.tokenId,
    })

      .lean()
      .exec();

    return res.status(201).send({ nft });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
