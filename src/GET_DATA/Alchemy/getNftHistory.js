const axios = require("axios");
const Alchemy = require("../../API/alchemy");
const web3 = require("web3");

// BAYC contract address
//main.js

// BAYC contract address
const address = ["0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b"];

// NFT Token ID
const nftId = 6923;

var data = JSON.stringify({
  jsonrpc: "2.0",
  id: 0,
  method: "alchemy_getAssetTransfers",
  params: [
    {
      fromBlock: "0x0",
      contractAddresses: address,
      excludeZeroValue: false,
      category: ["erc721"],
    },
  ],
});

var config = {
  method: "post",
  url: Alchemy.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    // Get transactions for the NFT
    txns = response["data"]["result"]["transfers"].filter(
      (txn) => web3.utils.hexToNumber(txn["erc721TokenId"]) === nftId
    );
    console.log(txns);
  })
  .catch(function (error) {
    console.log(error);
  });
