const mongoose = require("mongoose");

// @todo banner data= imageData
const FloorOrder = mongoose.Schema({
  price: { type: Number },
});

const CollectionFloor = mongoose.Schema({
  floorPriceOS: { type: Number },
  floorPrice: { type: Number },
  floorChange24h: { type: Number },
  floorChange7d: { type: Number },
  floorChange30d: { type: Number },
});

const CollectionOwner = mongoose.Schema({
  address: { type: String },
  isVerified: { type: Boolean },
  name: { type: String },
  avatar: { type: "collection" | "name" | "description" },
});

const CollectionVolume = mongoose.Schema({
  volumeAll: { type: Number },
  volume24h: { type: Number },
  change24h: { type: Number },
});

const AttributeValue = mongoose.Schema({
  id: {
    type: String,
  },
  traitType: { type: String },
  value: { type: String },
  displayType: { type: "date" | "number" | "string" },
  count: { type: Number },
});

const Attribute = mongoose.Schema({
  traitType: { type: String },
  values: [{ type: AttributeValue }],
});

const ImageData = mongoose.Schema({
  src: { type: String },
  contentType: { type: String },
});

const collectionSchema = mongoose.Schema(
  {
    address: { type: String },
    name: { type: String },
    payoutAddress: { type: String },

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
    logo: { type: ImageData },
    type: { type: String },
    attributes: [{ type: Attribute }],
    banner: { type: ImageData },
    bannerImageURL: { type: String },
    imageURL: { type: String },
    slug: { type: String },

    websiteLink: { type: String },
    facebookLink: { type: String },
    telegramLink: { type: String },
    twitterLink: { type: String },
    mediumLink: { type: String },
    instagramLink: { type: String },
    discordLink: { type: String },

    symbol: { type: String },
    totalSuppply: { type: String },
    displayData: { type: Object },
    countOwners: { type: Number },
    owner: { type: CollectionOwner },
    floor: { type: CollectionFloor },
    floorOrder: { type: FloorOrder },
    volume: { type: CollectionVolume },
    cloud_image_url: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("collection", collectionSchema);
