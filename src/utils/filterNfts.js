const fields = [
  "contract",
  "id",
  "title",
  "description",
  "tokenUri",
  "media",
  "metadata",
];

// It will check each nft if all the fields are available and with non-empty  value
function nftObjectCheck(nftObject) {
  return (
    nftObject.contract.address.length > 0 &&
    nftObject.id.tokenId.length > 0 &&
    Object.keys(nftObject.id.tokenMetadata).length > 0 &&
    nftObject.title.length > 0 &&
    nftObject.description.length > 0 &&
    nftObject.tokenUri.gateway.length > 0 &&
    Object.keys(nftObject.media).length > 0 &&
    nftObject.metadata.attributes.length > 0 &&
    nftObject.metadata.name.length > 0 &&
    nftObject.metadata.image.length > 0
  );
}

// It will check if it passes the nft object check and will return list of failed list
function nftArrayCheck(nftsArray) {
  let failedList = [];
  for (let i = 0; i < nftsArray.length; i++) {
    if (!nftObjectCheck(nftsArray[i])) {
      failedList.push(nftsArray[i]);
    }
  }

  return failedList;
}

module.exports = { nftArrayCheck };
