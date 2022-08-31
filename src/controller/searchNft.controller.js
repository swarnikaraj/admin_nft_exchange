const express = require("express");
const Nftmodel = require("../model/nft.model");

const router = express.Router();
router.get("/:address", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 12;

    const skip = (page - 1) * size;

    var queryString = { address: req.params.address };

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

    const nft = await Nftmodel.find(queryString)
      .skip(skip)
      .limit(size)
      // .sort([['index', 1]])
      .lean()
      .exec();

    totalPages = Math.ceil(
      (await Nftmodel.find(queryString).countDocuments()) / size
    );

    //res.body.nft[0].tokenURI = 100
    // console.log(nft[0].tokenURI)
    // for (i = 0; i < nft.length; i++) {
    //     nft[i].tokenURI = JSON.parse(nft[i].tokenURI)

    return res.status(201).send({ nft, totalPages });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
