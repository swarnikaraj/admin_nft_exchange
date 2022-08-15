const express = require("express");
const NftModel = require("../model/nft.model");

const get_data_alchemy = require("../../src/GET_DATA/Alchemy/getNftsForCollection");

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

    const nft = await NftModel.find({
      contract: { address: req.params.address },
    })
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

    totalPages = Math.ceil(
      (await NftModel.find({
        contract: { address: req.params.address },
      }).countDocuments()) / size
    );

    totalNfts = await NftModel.find({
      contract: { address: req.params.address },
    }).countDocuments();

    return res.status(201).send({ nft, totalPages, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});



router.post("/:address", async (req, res) => {
  try {
    // check if already there

    let nfts = await NftModel.find({
      contract: { address: req.params.address },
    })
      .limit(3)
      .lean()
      .exec();

    // if it already exists then throw an error
    if (nfts.length > 1) {
      return res.status(400).json({
        status: "failed",
        message: " Please provide different address",
      });
    }

    let startToken = "";
    let hasNextPage = true;
    let totalnfts = [];
    totalNftsFound = 0;
    while (hasNextPage) {
      const { nfts, nextToken } =
        await get_data_alchemy.callGetNFTsForCollectionOnce(
          startToken,
          req.params.address
        );

      let nft = await NftModel.insertMany(nfts);
      console.log(nft);
      // console.log(nft);
      if (!nextToken) {
        // When nextToken is not present, then there are no more NFTs to fetch.
        hasNextPage = false;
      }
      startToken = nextToken;
      totalNftsFound += nfts.length;
    }

    return res.status(200).send("nfts has been uploaded");
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/:address", async (req, res) => {
  try {
    console.log("start deleting");
    const nft = await NftModel.deleteMany({
      contract: { address: req.params.address },
    });

    console.log(nft);

    return res.status(201).send({ nft });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
