const axios = require("axios");

const Alchemy = require("../../API/alchemy");
// replace with your Alchemy api key

async function getContractMetaData(address) {
  const baseURL = Alchemy.baseURL + "getContractMetadata";
  const contractAddr = address;

  var config = {
    method: "get",
    url: `${baseURL}?contractAddress=${contractAddr}`,
    headers: {},
  };

  try {
    const res = await axios(config);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getContractMetaData };
