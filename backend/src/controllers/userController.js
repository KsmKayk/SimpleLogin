const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      message: "this user already exists",
      user: user
    })
    
  },
}