const express = require("express");

const router = express.Router();
const MakerOrderModel=require("../../model/Order/makerOrder.model")

router.post("/",
  async (req, res) => {
    try {
      let order = await MakerOrderModel.create(req.body)
        .lean()
        .exec();
      
      return res.status(200).json({ order });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {

    const order = await MakerOrderModel.findByIdAndDelete(
      req.params._id,
    );
   ;

    return res.status(201).send({ order });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/singerAddress/:signerAddress", async (req, res) => {
    try {
     
  
      const order = await MakerOrderModel.find({
        signerAddress: req.params.signerAddress,
      });
     
  
      return res.status(201).send({ order });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });

router.get("/:id", async (req, res) => {
    try {
     
  
      const order = await MakerOrderModel.findById(req.params.id)
     
  
      return res.status(201).send({ order });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });

  router.get("/:signerAddress/collectionAddress/tokenId", async (req, res) => {
    try {
     
  
      const order = await MakerOrderModel.find({
          $and:[
        {signerAddress: req.params.signerAddress},
        {collectionAddress: req.params.collectionAddress},
        {tokenId:req.params.tokenId}
          ]
      });
     
  
      return res.status(201).send({ order });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });

module.exports = router;
