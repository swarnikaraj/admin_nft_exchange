const express = require("express");
const CollectionModel = require("../model/collection.model");

const router = express.Router();



router.get("/address/:address", async (req, res) => {
  try {
    const collection = await CollectionModel.find({
      address: req.params.address,
    })
      .lean()
      .exec();
    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const collection = await CollectionModel.find({name:{$regex: req.params.name,$options:'i'}})
      .lean()
      .exec();
    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});







module.exports = router;
