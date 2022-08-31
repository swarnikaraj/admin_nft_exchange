const Moralis = require("moralis-v1/node");
const Moralis_CONFIG = require("../../API/moralis");
var serverUrl = Moralis_CONFIG.SERVER_ENDPOINT;
var appId = Moralis_CONFIG.APP_ID;

var moralisSecret = Moralis_CONFIG.MORALIS_SECRET;

async function getSingleNft(contract, index) {
  try {
    console.log("hello");
    var formated_index = String(Number(index));
    await Moralis.start({ serverUrl, appId, moralisSecret });
    const options = {
      address: contract,
      token_id: formated_index,
      chain: "eth",
    };

    const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
      options
    );
    console.log(tokenIdMetadata);
    return tokenIdMetadata;
  } catch (e) {
    console.log(e);
  }
}

getSingleNft("0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b", "2039");

module.exports = { getSingleNft };
