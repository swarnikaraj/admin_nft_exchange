const express = require("express");
const CollectionModel = require("../model/collection.model");

const collection_middleware = require("../middleware/collection.middleware");

const { json } = require("express/lib/response");
const collection_cloudinary_uploader = require("../middleware/collection.imageUploader");
const authenticatedRoute = require("../middleware/Auth/authenticate");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const collection = await CollectionModel.find().lean().exec();
    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:address", async (req, res) => {
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

router.post(
  "/:address",

  collection_middleware.createCollection,
  collection_cloudinary_uploader.uploadImage,
  async (req, res) => {
    try {
      let collection = await CollectionModel.findOne({
        address: req.params.address,
      })
        .lean()
        .exec();
      //if it already exist then throw err

      if (collection)
        return res.status(400).json({
          status: "failed",
          message: "This address already exist, get a new address",
        });
      //else we will create the contract

      console.log(req.body, "request body hu mai");
      let finalData = {
        ...req.body,
        symbol: req.body.symbol,
        address: req.params.address,
      };
      collection = await CollectionModel.create(finalData);

      return res.status(200).json({ collection });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.delete("/:address", async (req, res) => {
  try {
    console.log("1");

    const collection = await CollectionModel.findOneAndDelete({
      address: req.params.address,
    });
    console.log(collection);

    return res.status(201).send({ collection });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
