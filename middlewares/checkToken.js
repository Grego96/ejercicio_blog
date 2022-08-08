require("dotenv").config();

// const checkJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = jwt.sign( {id: req.user.id} , process.env.APP_JWT_SECRET);
  console.log(token);
  next()
};
