const res = require("express/lib/response");
const db = require("../models");
const User = db.user;
//const pubItems = require("../packs/pub");

exports.allAccess = (req, res) => {
  res.status(200).send();
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.userShops = (req, res) => {
   fetchid = req.params.id;
  User.find(({ id:fetchid }), function (err, data) {
    if (err) {
      res.status(500).send("ERROR")
    } else {
      if (data.length == 0) {
        res.status(500).send("no data")
      } else {
        res.status(200).send(data);
      }
    }
  })
};

/*
exports.pub = (req, res) => {
  res.status(200).send(pubItems);
};

*/