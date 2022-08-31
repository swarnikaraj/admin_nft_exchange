const axios = require("axios");
const Alchemy = require("../../API/alchemy");

// TIMEPieces contract address
const address = "0xDd69da9a83ceDc730bc4d3C56E96D29Acc05eCDE";

// Safe Haven Token ID
const tokenId = 4254;

async function getNftOwner(address, tokenId) {
  const baseURL = Alchemy.baseURL + "getOwnersForToken";
  const url = `${baseURL}?contractAddress=${address}&tokenId=${tokenId}`;

  const config = {
    method: "get",
    url: url,
  };
  try {
    const res = await axios(config);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getNftOwner };
