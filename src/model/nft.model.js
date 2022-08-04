const mongoose = require("mongoose");

const nftSchema = mongoose.Schema(
  {
    contract: { type: Object },
    id: { type: Object },
    title: { type: String },
    description: { type: String },
    tokenUri: { type: Object },
    media: { type: Object },
    metadata: { type: Object },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("nft", nftSchema);
