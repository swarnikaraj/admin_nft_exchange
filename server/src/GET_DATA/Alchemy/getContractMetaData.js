const axios = require("axios");

const Alchemy = require("../../API/alchemy");
// replace with your Alchemy api key

function getContractMetaData(address) {
  const baseURL = Alchemy.baseURL + "getContractMetadata";
  const contractAddr = address;

  var config = {
    method: "get",
    url: `${baseURL}?contractAddress=${contractAddr}`,
    headers: {},
  };

  const res = axios(config)
    .then((response) => console.log(JSON.stringify(response.data, null, 2)))
    .catch((error) => console.log(error));
}

module.exports = { getContractMetaData };
