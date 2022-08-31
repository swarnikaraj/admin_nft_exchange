const express = require("express");
const CollectionModel = require("../model/collection.model");
const NftModel = require("../model/nft.model");
const router = express.Router();
const crypto = require("crypto");

router.get("/bundle", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;
    const skip = (page - 1) * size;
    const collection = await CollectionModel.find()
      .skip(skip)
      .limit(size)
      .lean()
      .exec();
    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;

    const skip = (page - 1) * size;
    const queryAddress = req.query.address;

    console.log(req.query, "query");

    const collection = await CollectionModel.findOne({
      address: req.query.address,
    })
      .select("-_id")
      .lean()
      .exec();

    collection.id = crypto.randomUUID();

    var queryString = {
      contract: { address: queryAddress },
    };

    if (req.query.search && req.query.search.stringTraits) {
      var attributes = req.query.search.stringTraits;

      const traitsQueryAll = attributes.map((trait) => {
        const traitsQueryEach = trait.values.map((v) => {
          return {
            trait_type: trait.name,
            value: v,
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
      // .sort({ name: 1 })
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

    for (let i = 0; i < initialTokens.length; i++) {
      initialTokens[i].image.contenType = initialTokens[i].media[0].format;
    }

    collection.initialTokens = initialTokens;
    for (let i = 0; i < initialTokens.length; i++) {
      initialTokens[i].tokenId = Number(initialTokens[i].tokenId);
      if (initialTokens[i].image.src.slice(0, 4) == "ipfs") {
        initialTokens[i].image.src =
          "https://ipfs.io/ipfs/" + initialTokens[i].image.src.slice(7);
      }
    }

    totalPages = Math.ceil(
      (await NftModel.find(queryString).countDocuments()) / size
    );

    totalNfts = await NftModel.find(queryString).countDocuments();

    return res.status(201).send({ collection, totalPages, totalNfts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
