const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    shops: [
      {
        shopId: String,
        shopName: String,
        items: []
      }
    ]
    ,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;