const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://eth-mainnet.g.alchemy.com/v2/Mbfg1nWBOL-wUBWLDFAwmD8zZ4xlOOs9"
  )
);

const ERC165Abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ERC1155InterfaceId = "0xd9b67a26";
const ERC721InterfaceId = "0x80ac58cd";

const openSeaErc1155Contract = "0xe3F0939374e642C05B021378F4ECa0B946cfB58f";
const myErc721Contract = "0xed5af388653567af2f388e6224dc7c4b3241c544";
var myresponse = 9;
async function checkERC115type(address) {
  const type115Contract = new web3.eth.Contract(ERC165Abi, address);

  await type115Contract.methods
    .supportsInterface(ERC1155InterfaceId)
    .call(function (err, res) {
      if (!err) {
        myresponse = res;
      } else {
        console.log(err);
      }
    });
  return myresponse;
}

function check721type(address) {
  const myContract = new web3.eth.Contract(ERC165Abi, address);

  const type = myContract.methods
    .supportsInterface(ERC721InterfaceId)
    .call()
    .then((res) => {
      return res;
      console.log("Is MyContract", myErc721Contract, " ERC721 - ", res);
    });

  return type;
}

module.exports = { check721type, checkERC115type };
