const axios = require("axios");

const Opensea_endpoint = require(`../../API/opensea`);

async function getContract(contract_address) {
  try {
    let res = await axios.get(
      `${Opensea_endpoint.CONTRACT_ENDPOINT}${contract_address}`
    );

    return res;

    // Work with the response...
  } catch (err) {
    if (err.response) {
      console.log("The client was given an error response (5xx, 4xx)");
      return err.response;

      // The client was given an error response (5xx, 4xx)
    } else if (err.request) {
      console.log(
        "The client never received a response, and the request was never left"
      );
      return err.request;
      // The client never received a response, and the request was never left
    } else {
      console.log("Anything else");
      // Anything else
      return err.message;
    }
  }
}

module.exports = { getContract };
