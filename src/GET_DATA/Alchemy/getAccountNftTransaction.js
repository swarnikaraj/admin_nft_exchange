const axios = require("axios");

const Alchemy = require("../../API/alchemy");

let data = JSON.stringify({
  jsonrpc: "2.0",
  id: 0,
  method: "alchemy_getAssetTransfers",
  params: [
    {
      fromBlock: "0x0",
      fromAddress: "0x811FdFff475631c25fC2c2495b4d7e662B9c6988",
    },
  ],
});

var requestOptions = {
  method: "post",
  headers: { "Content-Type": "application/json" },
  data: data,
};

const apiKey = "demo";
const baseURL = `${Alchemy.baseURL}`;
const axiosURL = `${baseURL}`;

axios(axiosURL, requestOptions)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch((error) => console.log(error));
