const express = require("express");
const router = express.Router();
const Blockchain_data=require("../GET_DATA/BlockChain/getOwner")
const Alchemy_data=require("../GET_DATA/Alchemy/getNftOwner")

  
  router.get("/", async (req, res) => {
    try {
      const nft = await Alchemy_data.getNftOwner(
        req.query.address,
        req.query.tokenId
      );
      console.log(nft);
  
      return res.status(201).send({ nft });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });


  module.exports = router;