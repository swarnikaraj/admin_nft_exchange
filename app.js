const express = require("express");
var cors = require("cors");
const cloudinary = require("cloudinary").v2;

const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");
const admin_authenticatedRoute = require("./src/middleware/Admin-Auth/authenticate");

// This is for admin regiration and login
const {
  register,
  login,
} = require("./src/controller/Auth/admin-auth.controller");

// this is authenticated for signed in user for creating bid or ask

const MakerOrderController=require("./src/controller/Order/order.controller")

// This is for user signIn through wallet
const {signIn}=require("./src/controller/Auth/user-auth.controller")

// this controller has post and delete request for collection
// it is Admin controller for collection
// it uses opensea api by default
const AdminCollectionController = require("./src/controller/admin.collection.controller");

// this controller has get request for collection
// it is non-authenticated and open for client
// it fetches data from data base
const CollectionController = require("./src/controller/collection.controller");

// it is admin controller for NFT
// it uses ALCHEMY api by default
// it Doesnt append the cloud image to the object
// it has post and delete request for nfts
const AdminNftController = require("./src/controller/admin.nft.controller");

// it is client controller for NFT
// it Doesnt append the cloud image to the object
// it has get request for nfts
const NftController = require("./src/controller/nft.controller");

// this controller will update token Uri for the nfts using blockchain middleware .
// it takes updateDefected/tokenURI in the path for tokenURI update
// it takes defected array of nfts as req.body
const NftBlockchainUpdateController = require("./src/controller/UPDATE/NftUpdate/alchemyNft");

//  this controller will updated all the fields of nfts using alchemy nft middle
// it takes /updateDefected in the path
// it takes defected array of nfts as req.body
const NftAlchemyUpdateController = require("./src/controller/UPDATE/NftUpdate/alchemyNft");

// this controller will update the cloudinery image for all nfts belongs to a particular colllection or address
const NftCloudImageUpdateController = require("./src/controller/UPDATE/NftUpdate/cloudImage");

// this controller will find the defected Nfts for a address
const NftDefectedFilterController = require("./src/controller/defectedNft.controller");

// this controller will find single nft data using addres and index
// this controller uses moralis node
const SingleNftController = require("./src/controller/single.nft.controller");

const HistoryController = require("./src/controller/nftHistory.controller");

const CollectionSearchController = require("./src/controller/searchCollection.controller");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Nft Exchange Admin panel");
  res.end();
});

app.use(express.json());

app.post("/admin/register", register);
app.post("/admin/login", login);

app.post("/sign",signIn)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connect = require("./src/config/db");

const port = process.env.PORT || 12345;
cloudinary.config({
  cloud_name: "dqvb74p8q",
  api_key: "612246647695153",
  api_secret: "ZcnKXPK_kjwlYyXE-MNRGyoNq4U",
  overwrite: true,
  secure: true,
});

//authenticated for admin
// this controller has post and delete request for collection
// it can only be operated via admin fronend
// it only takes address as params
app.use("/admin/collection", AdminCollectionController);

//non-authenticated and open for client
// this controller has get request for collection
// it takes /:address in the path to get single collection
app.use("/collection", CollectionController);

// returns single nft data
// It has only get request and open for client
// it takes /:address/:index in the path to get single nft
app.use("/collection/asset", SingleNftController);

// returns nfts array for a collection address
// It has only get request and open for client
// it takes /:address in the path to get list of nfts corresponding to a address
app.use("/collection/asset/bundle", NftController);

// return nft history
// It has only get request and open for client
// it takes /:address/:index in the path to get single nft
app.use("/collection/history/", HistoryController);

// it has get post delete request for Nft
// it only takes address as params
app.use("/admin/nft", AdminNftController);

// it takes updateDefected/tokenURI in the path for tokenURI update
// it takes defected array of nfts as req.body
app.use("/admin/nft/blockChainUpdate", NftBlockchainUpdateController);

// it takes /updateDefected in the path
// it takes defected array of nfts as req.body
app.use("/admin/nft/alchemyUpdate", NftAlchemyUpdateController);

// it takes "updateDefected/:address in the path
app.use("/admin/nft/cloudImageUpdate", NftCloudImageUpdateController);

// it takes /:address in the path
app.use("/admin/nft/filter/defected", NftDefectedFilterController);

// it results search in collection by address and by name
// use address/:address for address search
// this is unauthenticated
// use /:name for name search
app.use("/collection/search", CollectionSearchController);


app.use("/order",MakerOrderController)



app.listen(port, async () => {
  await connect();
  console.log(`server is runnning at port ${port}`);
});
