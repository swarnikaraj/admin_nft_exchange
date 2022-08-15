const express = require("express");
const NftModel = require("../../../model/nft.model");
const nft_cloudinary_uploader = require("../../../middleware/nft.imageUploader");
const router = express.Router();

// this router will  update each nft with clodinery image 
router.patch("updateDefected/:address", async (req, res) => {
  try {
    var nftToUpdate= await NftModel.find({
        contract: { address: req.params.address },
      })

 
    for (let i = 0; i < nftToUpdate.length; i++) {
      var updatedNftObj = await nft_cloudinary_uploader.uploadImage(nftToUpdate[i]);

      const nft = await NftModel.findOneAndUpdate(
        { _id: nftToUpdate[i]._id },
        nftToUpdate[i],
        { new: true }
      )
        .lean()
        .exec();
      console.log(nft);

     
    }
    

    return res.status(200).json( "cloud image nftUpdated");
  
   
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;