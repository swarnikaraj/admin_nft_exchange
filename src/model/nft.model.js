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

const Owner = mongoose.Schema({
  address: { type: String },
  name: { type: String },
  avatar: { type: ImageData },
});

const TokenOwner = mongoose.Schema({
  owner: { type: Owner },
  balance: { Number },
});

const FloorOrder = mongoose.Schema({
  price: { type: Number },
});

const Attribute = mongoose.Schema({
  id: { type: String },
  traitType: { type: String },
  value: { type: String },
  count: { type: Number },
  displayType: "date" | "number" | "string",
  floorOrder: { type: FloorOrder },
});

const MakerOrderSchema = mongoose.Schema(
  {
    isOrderAsk: { type: Boolean, required: true }, // true --> ask / false --> bid
    signerAddress: { type: String, required: true }, // signer of the maker order
    collectionAddress: { type: String, required: true }, //collection address
    price: { type: Number, required: true }, // price used as
    tokenId: { type: String, required: true }, // Id of the token
    amount: { type: String, required: true }, // amount of tokens to sell/purchase
    nonce: { type: Number, required: true }, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
    strategy_address: { type: String, required: true }, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    stategy: {
      required: true,
      type: String,
      enum: ["Auction", "StandardSaleForFixedPrice"],
      default: "StandardSaleForFixedPrice",
    },
    minPercentageToAsk: { type: Number, required: true }, // // slippage protection (9000 --> 90% of the final price must return to ask)
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const nftSchema = mongoose.Schema(
  {
    id: { type: String },

    Collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collection",
    },
    contract: { type: Object },

    // @todo collection for collection id ref

    // @todo _id to id
    id: { type: String },
    name: { type: String },
    tokenId: { type: String },

    //  @todo title is name

    description: { type: String },
    tokenUri: { type: Object },
    media: { type: Object },
    metadata: { type: Object },
    title: { type: String },
    image: { type: ImageData },
    animation: { type: AnimationData },
    attributes: [
      {
        type: Attribute,
      },
    ],
    // @todo image has to be cloud_image
    cloud_image_url: { type: String },
    ask: [{ type: MakerOrderSchema ,required:false}],
    lastOrder: [{ type: Order ,required:false}],
    bids: [{ type: MakerOrderSchema ,required:false}],
    rarity:{type:Object, required:false}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("nft", nftSchema);

//  @todo user me 2 fild chaiye address and nonce
