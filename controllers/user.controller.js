const res = require("express/lib/response");
const db = require("../models");
const Packs = require("../models/packs.model");
const User = db.user;
//const pubItems = require("../packs/pub");

exports.allAccess = (req, res) => {
  res.status(200).send();
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {

  Packs.find( function (err, data) {
    if (err) {
      res.status(500).send("error")
    } else {
      res.status(200).send(data);
    }
  })
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
        console.log("no data");
        res.status(500).send("no data")
      } else {
        console.log("success");
        res.status(200).send(data);
      }
    }
  })
};


exports.customPacks = (req, res) => {

  Packs.find( function (err, data) {
    if (err) {
      res.status(500).send("error")
    } else {
      res.status(200).send(data);
    }
  })
};

