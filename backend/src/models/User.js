const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type : String , unique : false, required : true },
  email: { type : String , unique : true, required : true },
  password_hash: { type : String , unique : false, required : true },
  short_bio: { type : String , unique : false, required : true }
});

module.exports = mongoose.model("User", UserSchema);