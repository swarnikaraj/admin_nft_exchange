const mongoose = require("mongoose");


const makerOrderSchema = mongoose.Schema(
  { isOrderAsk:{type:Boolean, required:true},// true --> ask / false --> bid
    
    signerAddress: { type: String ,required:true},// signer of the maker order
    collectionAddress:{ type: String,required:true } ,//collection address
    price: { type: Number,required:true },// price used as
    tokenId: { type: String,required:true },// Id of the token
    amount: { type: String ,required:true},// amount of tokens to sell/purchase
    nonce: { type: Number,required:true },// order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
    strategy:{type:String,required:true},// strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
    startTime:{type:Date,required:true},
    endTime:{type:Date,required:true},
    stategyType: {required:true,
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


const OrderBook=mongoose.Schema({
  nft_id:{type:mongoose.Schema.Types.ObjectId,
    ref:'nft'},
   
  collectionAddress: { type: String ,required:true},
  tokenId: { type: String,required:true },
  asks:[{type:makerOrderSchema}],
  bids:[{type:makerOrderSchema}],

})


// isOrderAsk: boolean; // true --> ask / false --> bid
//   signer: string; // signer address of the maker order
//   collection: string; // collection address
//   price: BigNumberish;
//   tokenId: BigNumberish; // id of the token
//   amount: BigNumberish; // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
//   strategy: string; // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
//   currency: string; // currency address
//   nonce: BigNumberish; // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
//   startTime: BigNumberish; // startTime in timestamp
//   endTime: BigNumberish; // endTime in timestamp
//   minPercentageToAsk: BigNumberish;
//   params: any[]; // params (e.g., price, target account for private sale)

module.exports = mongoose.model("makerOrder", makerOrderSchema);
