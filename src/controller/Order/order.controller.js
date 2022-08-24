const express = require("express");

const router = express.Router();
const MakerOrderModel = require("../../model/Order/Order.model");
const NftModel=require("../../model/nft.model")
const authenticated = require("../../middleware/Admin-Auth/authenticate");

router.post("/:address/:tokenId", authenticated, async (req, res) => {
  try {
    // address validation
    let order = await MakerOrderModel.create(req.body);

    const maxBid = await MakerOrderModel.find({})
      // .select() select basisis of time
      // update time
      .sort({ price: -1 })
      .limit(1)
      .exec();

    // write max bid to nft

    // const nft = await NftModel.findOneAndUpdate(
    //   {
    //     contract: { address: req.params.address },
    //     tokenId: req.params.tokenId,
    //   },
    //   { bids: [maxBid] },
    //   { new: true }
    // );

    return res.status(200).json({ order });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const order = await MakerOrderModel.findByIdAndDelete(req.params._id);
    return res.status(201).send({ order });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:singerAddress", async (req, res) => {
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
    const order = await MakerOrderModel.findById(req.params.id);

    return res.status(201).send({ order });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/:signerAddress/collectionAddress/tokenId", async (req, res) => {
  try {
    const order = await MakerOrderModel.find({
      $and: [
        { signerAddress: req.params.signerAddress },
        { collectionAddress: req.params.collectionAddress },
        { tokenId: req.params.tokenId },
      ],
    });

    return res.status(201).send({ order });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
