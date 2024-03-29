const axios = require("axios");

const Alchemy = require("../../API/alchemy");

let data = JSON.stringify({
  jsonrpc: "2.0",
  id: 0,
  method: "alchemy_getAssetTransfers",
  params: [
    {
      fromBlock: "0x0",
      fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    },
  ],
});

var requestOptions = {
  method: "post",
  headers: { "Content-Type": "application/json" },
  data: data,
};

const axiosURL = `${Alchemy.baseURL}`;

axios(axiosURL, requestOptions)
  .then((response) =>
    console.log(JSON.stringify(response.data, null, 2), "hello")
  )
  .catch((error) => console.log(error, "erro hu"));

  