const Web3 = require("web3");
const Moralis = require("moralis");

const API_Config = require("../../API/moralis");

async function nftHistory(contractAddress, index) {
  const Moralis = require("moralis/node");
  await Moralis.start({
    serverUrl: API_Config.SERVER_ENDPOINT,
    appId: API_Config.APP_ID,
  });
  const options = {
    address: contractAddress,
    token_id: index,
    chain: "eth",
  };
  const transfers = await Moralis.Web3API.token.getWalletTokenIdTransfers(
    options
  );
  console.log(transfers);
  return transfers;
}

module.exports = { nftHistory };
