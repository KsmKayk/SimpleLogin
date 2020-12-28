const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET;

module.exports = {
  async index(req, res) {
    await User.find().maxTime(10000).exec(function(err, doc) {
      if(!err) {
        return res.status(200).json(doc)
      }
      return res.status(500).json({
        error: err
      })
    });
  },
  async show(req, res) {
    const {id} = req.params
    await User.findById(id).maxTime(10000).exec(function(err, doc) {
      if(!err) {
        return res.status(200).json(doc)
      }
      return res.status(500).json({
        error: err
      })
    })
  },
  async store(req, res) {
    const { name, email, password, short_bio } = req.body;

    let user = await User.findOne({ email })

    if (!user) {
      let password_hash = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password_hash,
        short_bio
      });

      if(!user) {
        return res.status(500).json({
          error: "unable to create this user, internal server error"
         }) 
      }
      return res.status(201).json(user);
    }

    return res.status(200).json({
      error: "this user already exists",
      user: user
    })
    
  },
  async update(req, res) {
    const {name, email, password, short_bio} = req.body
    const {id} = req.params
    const user_id = req.user.user_id
    if(id == user_id) {
      let password_hash = await bcrypt.hash(password, 10);
      User.findByIdAndUpdate(id, {name, email, password_hash, short_bio},function(err, result) {
        if(err) {
          return res.status(500).json({error: err})
        }
        return res.status(200).json({message: "You has edited this user", user: result})
      })
    }
    else {
      return res.status(401).json({error: "You don't have permission to edit this user"})
    }
  },
  async delete(req, res) {
    const {id} = req.params
    const user_id = req.user.user_id
    if(id == user_id) {
      User.findByIdAndDelete(id, function(err, result) {
        if(err) {
          return res.status(500).json({error: err})
        }

        return res.status(200).json({message: 'User deleted successfully.', user: result})
      })
    }
    else {
      return res.status(401).json({error: "You don't have permission to delete this user"})
    }
  },
  async login(req, res) {
    const {email, password} = req.body;
    let user = await User.findOne({ email })
    if(!user) {
      return res.status(401).json({ error: "Authentication fail"})
    }

    bcrypt.compare(password, user.password_hash,(err, result) => {
      if(err) {
        return res.status(401).json({ error: "Authentication fail"})
      }
      if(result) {
        const token = jwt.sign({
          user_id: user._id,
          name: user.name,
          email: user.email
        }, jwt_secret, {
          expiresIn: "6h"
        })
        return res.status(200).json({ message: "Authentication successful", token: token });
      }

      return res.status(401).json({ error: "Wrong password or email"})
    })
  }
}