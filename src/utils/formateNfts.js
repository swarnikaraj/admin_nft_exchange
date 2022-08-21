const crypto = require("crypto");

const { formatNftAttributes } = require("../utils/formateAtrribute");

const formateNftList = (nftList) => {
  let newNftList = [];

  console.log(nftList, "inside");

  // for (let i = 0; i < nftList.length; i++) {
  //   let formatedAttribute = formatNftAttributes(nftList[i].metadata.attributes);

  //   obj = {
  //     ...nftList[i],
  //     id: crypto.randomUUID(),
  //     name: nftList[i].metadata.name,
  //     tokenId: nftList[i].id.tokenId,
  //     image: nftList[i].tokenUri.gateway,
  //     attributes: formatedAttribute,
  //   };

  //   newNftList.push(obj);
  // }
  // return newNftList;
};

module.exports = { formateNftList };
