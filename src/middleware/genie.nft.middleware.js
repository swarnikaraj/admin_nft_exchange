
const Genei_data=require("../GET_DATA/Genie/nft.google_img.data")

async function getNftsForPost(address, req) {
    const nftData = await Genei_data.getNfts(address);
    req.body = nftData;
    return req.body;
  }
  