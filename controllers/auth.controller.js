const config = require("../config/auth.config");
const db = require("../models");
const uniqid = require("uniqid");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");
const res = require("express/lib/response");
const Packs = require("../models/packs.model");
const { header } = require("express/lib/response");


exports.updatePacks = async (req, res) => {
  console.log(req.body.newItem.name);
  let packName = await req.body.activePack;
  let newItem = await req.body.newItem;
  const filter = { name: packName };
  try {
    await Packs.updateOne(
      filter,
      {
        $push: {
          items:
          {
            name: newItem.name,
            id: newItem.id,
            cost: newItem.cost,
            coinType: newItem.coinType,
            desc: newItem.desc
          }   
        }
      }
    );
    res.status(200).send({ message: "item Added" });
  } catch (err) {
    console.error(err)
  }};

exports.saveShopItems = async (req, res) => {
 
  let userId = await JSON.parse(req.body.shopData.id);
  let userShopId = await req.body.shopData.shopId;
  let upItems = await req.body.shopData.items;
  let upShopName = await req.body.shopData.shopName;
  let hasShop = await User.countDocuments({ id: userId, "shops.shopId": userShopId });
  const filter = { id: userId, "shops.shopId": userShopId };

  if (hasShop > 0) {
    try {
      await User.updateOne(
        filter,
        {
          $set: {
            "shops.$.shopName": upShopName,
            "shops.$.items": upItems
          
          }
        }
      );
      res.status(200).send({ message: "shop updated" });
    } catch (err) {
    console.error(err);
  }
  } else {
    try{
    await User.updateOne(
      { id: userId },
      {
        $push: {
          shops:
          {
            shopId: userShopId,
            shopName: upShopName,
            items: upItems
          }
        }
      }
    );
      res.status(200).send({ message: "shop made" });
    } catch (err) {
    console.error(err);
  }}};

exports.deleteShop = async (req, res) => {
let userId = req.query.id;
let userShopId = req.query.shopId;
 const filter = { id: userId };
 // let userShopName = req.body.shopData.shopName;
  try {
    await User.findOneAndUpdate(
      filter,
      {
        $pull: {
          shops:
            {
            shopId: userShopId      
         }
        } 
      }
    );
    console.log("shop deleted");
  } catch (err) {
    console.error(err);
  }
};


exports.saveTavernItems = async (req, res) => {
 
  let upid = JSON.parse(req.body.tavernData.id);
  let uptaverns = req.body.tavernData.taverns;
  
 

   User.findOneAndUpdate({ id:upid }, { $set: { taverns: uptaverns} },
    { new: true }, (err, data) => {
      if (err) {
        res.send("ERROR")
      } else {
        if (data === null) {
          console.log("nothing")
          res.send("nothing found")
        } else {
          res.send(data)
          console.log(uptaverns);
          console.log("items saved")
        }
      }
   })
};

exports.signup = (req, res) => {
  const user = new User({
    id: uniqid(),
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    shops: []
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        uniqid: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};