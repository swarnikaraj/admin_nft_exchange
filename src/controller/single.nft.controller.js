const express = require("express");
const router = express.Router();

const singleNft = require("../GET_DATA/Moralis/getSingleNft");

router.get("/", async (req, res) => {
  try {
    const queryAddress = req.query.address;
    const queryIndex = req.query.index;

    var nft = await singleNft.getSingleNft(queryAddress, queryIndex);
    console.log(nft);

    return res.status(201).send({ nft });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
