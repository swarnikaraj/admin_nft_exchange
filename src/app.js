const express = require("express");
var cors = require("cors");
const cloudinary = require("cloudinary").v2;

const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");

const { register, login } = require("./controller/Auth/auth.controller");
const collectionController = require("./controller/collection.controller");
const nftController = require("./controller/nft.controller");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Nft Exchange");
  res.end();
});

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const connect = require("../src/config/db");

const port = process.env.PORT || 12345;
cloudinary.config({
  cloud_name: "dqvb74p8q",
  api_key: "612246647695153",
  api_secret: "ZcnKXPK_kjwlYyXE-MNRGyoNq4U",
  secure: true,
});

app.use("/collection", collectionController);
app.use("/nft", nftController);

app.get("/", async (req, res) => {
  res.send("Welcome to the Nft Exchange");
});

app.listen(port, async () => {
  await connect();
  console.log(`server is runnning at port ${port}`);
});
