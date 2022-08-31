const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    profile: { type: Object },
    hashAddress:{type:String},
    address: { type: String, required: true },
    asks: [{ type: MakerOrderSchema, required: false }],
    bids: [{ type: MakerOrderSchema, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("address")) return next();
  bcrypt.hash(this.address, 10, (err, hash) => {
    this.hashAddress = hash;
    return next();
  });
});

userSchema.methods.checkAddress = function (address) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(address, this.address, function (err, same) {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};

module.exports = model("user", userSchema); // users
