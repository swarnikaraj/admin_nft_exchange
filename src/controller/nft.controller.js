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
    var queryString = {
      contract: { address: queryAddress },
    };

    if (req.query.search && req.query.search.stringTraits) {
      var attributes = req.query.search.stringTraits;

      const traitsQueryAll = attributes.map((trait) => {
        const traitsQueryEach = trait.values.map((v) => {
          return {
            traitType: new RegExp(`^${trait.name}$`, "i"),
            value: new RegExp(`^${v}$`, "i"),
          };
        });
        return {
          $elemMatch: {
            $or: traitsQueryEach,
          },
        };
      });
      queryString = {
        ...queryString,
        attributes: { $all: traitsQueryAll },
      };
    }

    const initialTokens = await NftModel.find(queryString)
      .select({
        id: 1,
        name: 1,
        tokenId: 1,
        description: 1,
        image: 1,
        media: 1,
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
      initialTokens[i].tokenId = Number(initialTokens[i].tokenId);
    }

    totalPages = Math.ceil(
      (await NftModel.find(queryString).countDocuments()) / size
    );

    totalNfts = await NftModel.find(queryString).countDocuments();

    return res.status(201).send({ initialTokens, totalPages, totalNfts ,page});
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
