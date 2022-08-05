const express = require("express");
const NftModel = require("../model/nft.model");
const filterNfts = require("../../src/utils/filterNfts");
const nft_middleware = require("../middleware/nft.middleware");
const get_data_alchemy = require("../../src/GET_DATA/Alchemy/getNftsForCollection");
const nft_cloudinary_uploader = require("../middleware/nft.imageUploader");
const { create } = require("../model/nft.model");
const router = express.Router();

router.get("/all/:address", async (req, res) => {
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

router.get("/arraycheck/defected/:address", async (req, res) => {
  try {
    const nft = await await NftModel.find({
      contract: { address: req.params.address },
    })
      .lean()
      .exec();

    totalNfts = Math.ceil(
      await NftModel.NftModel.find({
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

router.get("/:address/:index", async (req, res) => {
  try {
    var nft = await NftModel.find({
      $and: [
        { contract: { address: req.params.address } },
        { id: { tokenId: req.params.index } },
      ],
    });
    return res.status(201).send({ nft });
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

      for (let i = 0; i < nfts.length; i++) {
        let modifiedone = await nft_cloudinary_uploader.uploadImage(nfts[i]);
      }

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

    return res.status(200).json({ totalnfts });
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

router.patch("/:address", async (req, res) => {
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

module.exports = router;
