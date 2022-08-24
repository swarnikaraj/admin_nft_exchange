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

    const collection = await CollectionModel.findOne({
      address: req.query.address,
    })
      .select("-_id")
      .lean()
      .exec();

    collection.id = crypto.randomUUID();

    const initialTokens = await NftModel.find({
      contract: { address: queryAddress },
    })
      .select({
        id: 1,
        name: 1,
        tokenId: 1,
        description: 1,
        image: 1,
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
      .sort({ name: 1 })
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

    collection.initialTokens = initialTokens;

    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
