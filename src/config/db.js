const mongoose = require("mongoose");

module.exports = () => {
  console.log(process.env.MONGO_URI, "Mongo URI");
  return mongoose.connect(process.env.MONGO_URI);
};
