const nfts_data = require("../GET_DATA/Alchemy/getNftsForCollection");
const nft_metadata = require("../GET_DATA/Alchemy/getNftMetaData");
const nft_Blockchain = require("../GET_DATA/BlockChain/getTokenURI");

const getNftsForPost = async (address, req) => {
  const nftData = await nfts_data.getNFTsForCollectionOnce(address);
  req.body = nftData;
  return req.body;
};

const getNftsForUpdate = async (defectedNft) => {
  let id = defectedNft._id;
  let address = defectedNft.contract.address;
  let tokenId = defectedNft.id.tokenId;
  let tokenType = defectedNft.id.tokenMetadata.tokenType;
  let newObj = await nft_metadata.getNFTMetadata(address, tokenId, tokenType);

  return newObj;
};

const getTokenUriBlockchain = async (address, tokenId, tokenType) => {
  let tokenUri = await nft_Blockchain.nftTokenURI(address, tokenId, tokenType);

  return tokenUri;
};

const getTokenUriForUpdateBlockChain = async (defectedNft) => {
  let id = defectedNft._id;
  let address = defectedNft.contract.address;
  let tokenId = defectedNft.id.tokenId;
  let tokenType = defectedNft.id.tokenMetadata.tokenType;

  let { tokenUri } = await nft_Blockchain.nftTokenURI(address, tokenId, tokenType);

  return tokenUri;
};

module.exports = {
  getNftsForPost,
  getNftsForUpdate,
  getTokenUriBlockchain,
  getTokenUriForUpdateBlockChain,
};
