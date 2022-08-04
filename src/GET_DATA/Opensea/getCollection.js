const axios = require("axios");

const Opensea_endpoint = require(`../../API/opensea`);

async function getCollection(collection_name) {
  try {
    let res = await axios.get(
      `${Opensea_endpoint.COLLECTION_ENDPOINT}${collection_name}`
    );

    return res;

    // Work with the response...
  } catch (err) {
    if (err.response) {
      return err.response;

      // The client was given an error response (5xx, 4xx)
    } else if (err.request) {
      return err.request;
      // The client never received a response, and the request was never left
    } else {
      // Anything else
      return err.message;
    }
  }
}

module.exports = { getCollection };
