const mongoose = require("mongoose");

const Packs = mongoose.model(
  "Packs",
  new mongoose.Schema({
      name: String,
    items: [
      {
        name: String,
        id: String,
        cost: String,
        cointType: String,
        desc: String
      }
    ]
  })
);

module.exports = Packs;