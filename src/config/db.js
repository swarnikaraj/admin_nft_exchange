const mongoose = require("mongoose");

module.exports = () => {
  console.log(process.env.MONGO_URI, "mai hu mongo uri");
  return mongoose.connect(process.env.MONGO_URI);
};
