const express = require("express");
const NftModel = require("../model/nft.model");
const crypto = require("crypto");
const CollectionModel = require("../model/collection.model");
const get_data_alchemy = require("../../src/GET_DATA/Alchemy/getNftsForCollection");

const router = express.Router();
const admin_authenticatedRoute = require("../middleware/Admin-Auth/authenticate");
const formatAttribute = require("../utils/formateAtrribute");
const { formateNftList } = require("../utils/formateNfts");

router.post("/:address", async (req, res) => {
  try {
    //   get  _Id fromcollection by finding by address

    var collection = await CollectionModel.findOne({
      address: req.params.address,
    })
      .lean()
      .exec();

    if (!collection) {
      return res.status(400).json({
        status: "failed",
        message: "Collection doesnt exists with this address",
      });
    }
    var mongoId = await collection._id;
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
        nfts[i].Collection = mongoId;
      }
      for (let j = 0; j < nfts.length; j++) {
        let formatedImage = {
          src: nfts[j].metadata.image,
        };

        nfts[j].name = nfts[j].metadata.name;
        nfts[j].tokenId = nfts[j].id.tokenId;
        nfts[j].image = formatedImage;
        formatAttribute.formatNftAttributes(
          nfts[j].metadata.attributes,
          nfts[j]
        );
        nfts[j].id = crypto.randomUUID();
        nfts[j].ask = [];
        nfts[j].bids = [];
        nfts[j].lastOrder = {};
      }
      let nft = await NftModel.insertMany(nfts);

      console.log(nfts);

      if (!nextToken) {
        // When nextToken is not present, then there are no more NFTs to fetch.
        hasNextPage = false;
      }
      startToken = nextToken;
      totalNftsFound += nfts.length;
    }
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
