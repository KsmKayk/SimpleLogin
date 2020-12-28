const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const users = await User.find();
    return res.status(200).json(users);
  },
  async store(req, res) {
    const { name, email, password, short_bio } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      let password_hash = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password_hash,
        short_bio
      });
    }
    return res.status(201).json(user);
  },
}