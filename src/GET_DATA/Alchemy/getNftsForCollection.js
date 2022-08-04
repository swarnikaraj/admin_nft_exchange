const axios = require("axios");

const Alchemy = require("../../API/alchemy");

const apiKey = "mCMmq0TfbtgToAu44dqMQNCxzDjC79Kv";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;

const withMetadata = "true";

async function callGetNFTsForCollectionOnce(startToken = "", address) {
  const url = `${baseURL}/?contractAddress=${address}&startToken=${startToken}&withMetadata=${withMetadata}`;
  const response = await axios.get(url);
  // console.dir(response.data.nfts, { depth: null });

  return response.data;
}

async function getNFTsForCollectionOnce(address) {
  let nftList = [];
  let startToken = "";
  let hasNextPage = true;
  totalNftsFound = 0;
  while (hasNextPage) {
    const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
      startToken,
      address
    );

    for (let i = 0; i < nfts.length; i++) {
      let obj = {
        ...nfts[i],
      };
      nftList.push(obj);
    }
    console.log(nfts);
    if (!nextToken) {
      // When nextToken is not present, then there are no more NFTs to fetch.
      hasNextPage = false;
    }
    startToken = nextToken;
    totalNftsFound += nfts.length;
  }

  return nftList;
}

module.exports = { callGetNFTsForCollectionOnce };

