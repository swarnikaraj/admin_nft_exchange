const express = require("express");
var cors = require('cors');

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());



const connect = require("./config/db");

const port = process.env.PORT || 1234;

app.listen(port, async () => {
  await connect();
  console.log(`server is runnning at port ${port}`);
});
