const mongoose = require("mongoose");

const ImageData = mongoose.Schema({
  src: { type: String },
  contentType: { type: String },
});


const AnimationData = mongoose.Schema({
  src: { type: String },
  contentType: { type: String },
  original: { type: String },
});


const Order = mongoose.Schema({
  price: { type: Number },
  currency: { type: String },
});


const nftSchema = mongoose.Schema(
  {
    contract: { type: Object },

    // @todo collection for collection id ref
    // @todo _id to id
    id: { type: String },

    //  @todo title is name
    name: { type: String },
    tokenId: { type: String },
    description: { type: String },
    tokenUri: { type: Object },
    media: { type: Object },
    metadata: { type: Object },
    title: { type: String },
    // @todo image has to be cloud_image
    cloud_image_url: { type: String },
    image: { type: ImageData },
    animation: { type: AnimationData },
    bids: { type: Object },
    ask: { type: Object },
    lastOrder: { type: Order },
    // separate bid
    // bids:[{type:Object}]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("nft", nftSchema);

//  @todo user me 2 fild chaiye address and nonce
