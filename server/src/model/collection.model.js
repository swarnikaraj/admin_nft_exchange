const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    address: { type: String },
    payoutAddress: { type: String },
    name: { type: Number },
    description: { type: String },
    imgThumbnail: { type: String },
    category: {
      type: String,
      enum: [
        "Art",
        "Collectibles",
        "Domain Name",
        "Music",
        "Photography",
        "Sports",
        "Trading Cards",
        "Utility",
        "Virtual Cards",
      ],
      default: "Collectibles",
    },
    traits: { type: Object },
    bannerImageURL: { type: String },
    discordURL: { type: String },
    externalURL: { type: String },
    imageURL: { type: String },
    name: { type: String },
    slug: { type: String },
    telegramURL: { type: String },
    twitterUsername: { type: String },
    instagramUsername: { type: String },
    symbol: { type: String },
    total_suppply: { type: String },
    displayData: { type: Object },

    cloud_image_url: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("collection", collectionSchema);
