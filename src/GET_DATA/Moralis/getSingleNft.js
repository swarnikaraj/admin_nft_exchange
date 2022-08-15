const Web3 = require("web3");
const Moralis = require("moralis");

const API_Config = require("../../API/moralis");

async function getSingleNft(contract, index) {
  const Moralis = require("moralis/node");
  await Moralis.start({
    serverUrl: API_Config.SERVER_ENDPOINT,
    appId: API_Config.APP_ID,
  });
  const options = {
    address: contract,
    token_id: index,
    chain: "eth",
  };
  const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    options
  );
  console.log(tokenIdMetadata);
  return tokenIdMetadata;
}

module.exports = { getSingleNft };
