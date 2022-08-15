const mongoose = require("mongoose");

const takerOrderSchema = mongoose.Schema(
  {
    isOrderAsk: { type: Boolean ,required:true}, // true --> ask / false --> bid
    addressTaker: { type: String ,required:true}, // msg.sender
    price: { type: String,required:true }, //final price for the purchsge
    tokenId: { type: String ,required:true}, // Id of the token
    minPercentageToAsk: { type: Number ,required:true}, // // slippage protection (9000 --> 90% of the final price must return to ask)
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("takerOrder", takerOrderSchema);
