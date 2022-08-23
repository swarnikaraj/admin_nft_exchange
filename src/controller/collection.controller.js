const express = require("express");
const CollectionModel = require("../model/collection.model");
const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:address", async (req, res) => {
  try {

    const queryAddress = +req.query.address;
    const collection = await CollectionModel.find({
      address: queryAddress,
    })
      .lean()
      .exec();
    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
