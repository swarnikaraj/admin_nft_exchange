const Opensea_Collection = require("../GET_DATA/Opensea/getCollection");
const Opensea_Contract = require("../GET_DATA/Opensea/getContract");

const createCollection = async (req, res, next) => {
  const collection = await Opensea_Collection.getCollection(req.body.slug);
  console.log(collection.data);
  //  received data from the opensea

  if (Object.keys(collection).length > 0) {
    let target_data = collection.data;

    let obj = {
      payoutAddress: target_data.collection.payout_address,
      name: target_data.collection.name,
      description: target_data.collection.description,
      traits: target_data.collection.traits,
      bannerImageURL: target_data.collection.banner_image_url,
      discordURL: target_data.collection.discord_url,
      externalURL: target_data.collection.external_url,
      imageURL: target_data.collection.image_url,
      slug: target_data.collection.slug,
      telegramURL: target_data.collection.telegram_url,
      twitterUsername: target_data.collection.twitter_username,
      instagramUsername: target_data.collection.instagram_username,
      total_suppply: target_data.collection.stats.total_supply,
      displayData: target_data.collection.display_data,
    };
    req.body = obj;
  }

  next();
};

module.exports = { createCollection };
