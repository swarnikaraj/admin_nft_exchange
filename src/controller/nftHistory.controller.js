const express = require("express");
const router = express.Router();
const Moralis_data=require("../GET_DATA/Moralis/getHistory")


  
  router.get("/:address/:index", async (req, res) => {
    try {
      const nft = await Moralis_data.nftHistory(
        req.params.address,
        req.params.index
      );
      console.log(nft);
  
      return res.status(201).send({ nft });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });


  module.exports = router;