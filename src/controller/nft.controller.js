const express = require("express");
const NftModel = require("../model/nft.model");

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const page = +req.query.page || 1;
//     const size = +req.query.size || 12;
//     const skip = (page - 1) * size;

//     const nft = await Nftmodel.find()
//       .skip(skip)
//       .limit(size)
//       // .sort([['index', 1]])
//       .lean()
//       .exec();

//     totalPages = Math.ceil((await NftModel.find().countDocuments()) / size);

//     return res.status(201).send({ nft, totalPages });
//   } catch (e) {
//     return res.status(500).json({ status: "failed", message: e.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;

    const skip = (page - 1) * size;
    const queryAddress = req.query.address;

    const initialTokens = await NftModel.find({
      contract: { address: queryAddress },
    })
      .select({
        id: 1,
        name: 1,
        tokenId: 1,
        description: 1,
        image: 1,
        media:1,
        animation: 1,
        attributes: 1,
        cloud_image_url: 1,
        ask: 1,
        lastOrder: 1,
        bids: 1,
        _id: 0,
        // Collection: 1,
        // tokenUri: 0,
        // media: 0,
        // metadata: 0,
        // title: 0,
      })
      .populate({
        path: "Collection",

        select: "-_id -attributes",
      })
      .sort({ name: 1 })
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

    for (let i = 0; i < initialTokens.length; i++) {
      initialTokens[i].collection = initialTokens[i].Collection;
      delete initialTokens[i].Collection;
    }
    for (let i = 0; i < initialTokens.length; i++) {
      initialTokens[i].image.contenType = initialTokens[i].media[0].format;
    }

    totalPages = Math.ceil(
      (await NftModel.find({
        contract: { address: queryAddress },
      }).countDocuments()) / size
    );

    totalNfts = await NftModel.find({
      contract: { address: queryAddress },
    }).countDocuments();

    return res.status(201).send({ initialTokens, totalPages, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:address/:tokenId", async (req, res) => {
  try {
    const queryAddress = req.query.address;
    const queryTokenId = req.query.tokenId;

    const nft = await NftModel.findOne({
      contract: { address: queryAddress },
      tokenId: queryTokenId,
    })
      .lean()
      .exec();

    return res.status(201).send({ nft });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
