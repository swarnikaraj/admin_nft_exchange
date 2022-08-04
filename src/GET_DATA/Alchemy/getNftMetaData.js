const axios = require("axios");
const Alchemy = require("../../API/alchemy");

function getNFTMetadata(address, tokenId, tokenType) {
  const baseURL = Alchemy.baseURL + "getNFTMetadata";
  const contractAddr = `${address}`;
  const tokenid = `${tokenId}`;
  const tokentype = `${tokenType}`;

  var config = {
    method: "get",
    url: `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenid}&tokenType=${tokentype}`,
    headers: {},
  };

  const res = axios(config)
    .then((response) => console.log(JSON.stringify(response.data, null, 2)))
    .catch((error) => console.log(error));

  return res.data;
}

module.exports = { getNFTMetadata };
