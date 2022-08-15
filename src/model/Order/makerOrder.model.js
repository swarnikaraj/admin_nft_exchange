const mongoose = require("mongoose");

const makerOrderSchema = mongoose.Schema(
  { isOrderAsk:{type:Boolean, required:true},// true --> ask / false --> bid
    signerAddress: { type: String ,required:true},// signer of the maker order
    collectionAddress:{ type: String,required:true } ,//collection address
    price: { type: Number,required:true },// price used as
    tokenId: { type: String,required:true },// Id of the token
    amount: { type: String ,required:true},// amount of tokens to sell/purchase
    nonce: { type: Number,required:true },// order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
    strategy_address:{type:String,required:true},// strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
    startTime:{type:Date,required:true},
    endTime:{type:Date,required:true},
    stategy: {required:true,
      type: String,
      enum: [
        "Auction",
        "StandardSaleForFixedPrice",
       
      ],
      default: "StandardSaleForFixedPrice"
      },
    minPercentageToAsk: { type: Number,required:true } // // slippage protection (9000 --> 90% of the final price must return to ask)
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("makerOrder", makerOrderSchema);
