const express = require("express");
const NftModel = require("../../../../model/nft.model");
const Genei_Data = require("../../../../GET_DATA/Genie/nft.google_img.data");
const axios = require("axios");
const router = express.Router();
const Genie_endpoint = require(`../../../../API/genie`);
const crypto = require("crypto");
const CollectionModel = require("../../../../model/collection.model");
const formateAttribute = require("../../../../utils/formateAtrribute");
const requestData = {
  filters: {
    address: "",
    traits: {},
    searchText: "",
    notForSale: true,
    numTraits: [],
  },
  fields: {
    address: 1,
    name: 1,
    id: 1,
    imageUrl: 1,
    currentPrice: 1,
    currentUsdPrice: 1,
    paymentToken: 1,
    animationUrl: 1,
    notForSale: 1,
    rarity: 1,
    tokenId: 1,
  },
  limit: 50,
  offset: 0,
  sort: { "rarity.providers.0.rank": -1 },
  markets: [],
};

function modifyeData(nfts, mongoId, des) {
  let modifiedList = [];
  for (let i = 0; i < nfts.length; i++) {
    myobj = {
      id: crypto.randomUUID(),
      Collection: mongoId,
      contract: { address: nfts[i].address },
      name: nfts[i].name,
      tokenId: Number(nfts[i].tokenId),
      description: des,
      media: [{ google_img: nfts[i].imageUrl }],
      title: nfts[i].name,
      image: { src: nfts[i].imageUrl },
      animation: { src: nfts[i].animationUrl },
      ask: [],
      lasOrder: {},
      bids: [],
      rarity: nfts[i].rarity,
      traits: nfts[i].traits,
    };
    modifiedList.push(myobj);
  }
  return modifiedList;
}

router.post("/:address", async (req, res) => {
  try {
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

    let nfts = await NftModel.find({
      contract: { address: req.params.address },
    })
      .limit(3)
      .lean()
      .exec();

    // if it already exists then throw an error
    if (nfts && nfts.length > 1) {
      return res.status(400).json({
        status: "failed",
        message: " Please provide different address",
      });
    }

    var hasnext = true;
    requestData.filters.address = req.params.address;

    const options = {
      url: `${Genie_endpoint.ENPOINT}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: requestData,
    };

    while (hasnext) {
      const res = await axios(options);
      const resData = res.data;
    

      const modifiedNfts = await modifyeData(
        resData.data,
        mongoId,
        collection.description
      );

      

      for (let j = 0; j < modifiedNfts.length; j++) {
        if (Array.isArray(modifiedNfts[j].traits)) {
          formateAttribute.formatNftAttributes(
            modifiedNfts[j].traits,
            modifiedNfts[j]
          );
        } else if (!modifiedNfts[j].traits) {
          modifiedNfts[j].attributes = [];
        } else {
          formateAttribute.formatNftAtrributesTypeObject(
            modifiedNfts[j].traits,
            modifiedNfts[j]
          );
        }
      }

      let nft = await NftModel.insertMany(modifiedNfts);

      console.log(nft);
      
      hasnext = resData.hasNext;
      requestData.offset = requestData.offset + 1;
    }

    console.log(hasnext, resData.hasNext, "Genei loop");
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
