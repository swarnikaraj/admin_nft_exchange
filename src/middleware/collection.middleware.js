const Opensea_Collection = require("../GET_DATA/Opensea/getCollection");
const Opensea_Contract = require("../GET_DATA/Opensea/getContract");
const Alchemy_Contract = require("../GET_DATA/Alchemy/getContractMetaData");
const formatAtrributes = require("../utils/formateAtrribute");

const createCollection = async (req, res, next) => {
  const Openseacollection = await Opensea_Collection.getCollection(
    req.body.slug
  );
  const alchemyContract = await Alchemy_Contract.getContractMetaData(
    req.params.address
  );

  //  received data from the opensea

  if (Object.keys(Openseacollection).length > 0) {
    let target_data = Openseacollection.data;

    const formatedTraits = formatAtrributes.formatCollectionAtrributes(
      target_data.collection.traits
    );
    let formatedBanner = {
      src: target_data.collection.banner_image_url,
    };
    let formatedLogo = {
      src: target_data.collection.image_url,
    };

    let formatedOwner = {
      address: target_data.collection.payout_address,
    };

    function getName() {
      let name1 = alchemyContract.contractMetadata.name;
      let name2 = target_data.collection.primary_asset_contracts.name;
      let name3 = target_data.collection.name;
      req.body.name;

      if (name1 && name1.length) {
        return name1;
      } else if (name2 && name2.length) {
        return name2;
      } else {
        return name3;
      }
    }

    
    let fomattedName = getName();

    let obj = {
      payoutAddress: target_data.collection.payout_address,
      name: fomattedName,
      symbol:
        alchemyContract.contractMetadata.symbol ||
        target_data.collection.primary_asset_contracts.symbol,
      description: target_data.collection.description,
      attributes: formatedTraits,
      type: alchemyContract.contractMetadata.tokenType || req.body.schema_name,
      bannerImageURL: target_data.collection.banner_image_url,
      banner: formatedBanner,
      websiteLink: target_data.collection.external_url,
      instagramLink:
        "https://www.instagram.com/" +
        target_data.collection.instagram_username,
      mediumLink:
        "https://medium.com/" + target_data.collection.medium_username,
      discordLink: target_data.collection.discord_url,
      instagramLink: target_data.collection.telegram_url,
      twitterLink:
        "https://twitter.com/" + target_data.collection.twitter_username,
      logo: formatedLogo,
      imageURL: target_data.collection.image_url,
      owner: formatedOwner,
      countOwners:
        target_data.collection.primary_asset_contracts.owner ||
        target_data.collection.stats.num_owners,
      slug: target_data.collection.slug,
      telegramURL: target_data.collection.telegram_url,
      twitterUsername: target_data.collection.twitter_username,
      instagramUsername: target_data.collection.instagram_username,
      totalSupply:
        alchemyContract.contractMetadata.totalSupply ||
        target_data.collection.stats.total_supply,
      displayData: target_data.collection.display_data,
    };
    req.body = obj;
  }

  next();
};

module.exports = { createCollection };
