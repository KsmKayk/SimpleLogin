const jwt = require("jsonwebtoken")
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, jwt_secret)
    req.user = decode;
    next()
  } catch (error) {
    return res.status(401).json({message: "Authentication fail"})
  }
}