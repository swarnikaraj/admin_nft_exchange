const mongoose = require("mongoose");

module.exports = () => {
  console.log(process.env.MONGO_URI)
  return mongoose.connect(process.env.MONGO_URI);
};

