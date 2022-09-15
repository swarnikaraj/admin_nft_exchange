const axios = require("axios");

const Genie_endpoint = require(`../../API/genie`);
const Format_Atrribute=require("../../utils/formateAtrribute")

const requestData = {
  filters: {
    address: "",
    traits: {},
    searchText: "",
    notForSale: true,
    numTraits: [],
  },
  fields: {
    address: 1,
    name: 1,
    id: 1,
    imageUrl: 1,
    currentPrice: 1,
    currentUsdPrice: 1,
    paymentToken: 1,
    animationUrl: 1,
    notForSale: 1,
    rarity: 1,
    tokenId: 1,
  },
  limit: 50,
  offset: 0,
  sort: { "rarity.providers.0.rank": -1 },
  markets: [],
};

async function getNfts(address) {
  try {
    var hasnext = true;
    requestData.filters.address = address;

    const options = {
      url: `${Genie_endpoint.ENPOINT}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: requestData,
    };
    var myobj = {};

    while (hasnext) {
      const res = await axios(options);
      const resData = res.data;

      hasnext = resData.hasNext;

      for (let i = 0; i < resData.data.length; i++) {
     
        var formattedAtrr=Format_Atrribute.formatNftAttributes(resData.data[i].traits,resData.data[i])

        myobj[resData.data[i].tokenId] = {
        attributes: formattedAtrr
       
        };

        requestData.offset = requestData.offset + 1;
      }
      console.log(hasnext, resData.hasNext, "Genei loop");
    }

    return myobj;

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

module.exports = { getNfts };
