const axios = require("axios");
const Alchemy = require("../../API/alchemy");


async function getNftsCollected(address) {
  const url = `${Alchemy.baseURL}getNFTs/?owner=${address}`;

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

module.exports = { getNftsCollected };
