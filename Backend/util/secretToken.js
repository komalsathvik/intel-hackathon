require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Create a JWT token for a given user ID
 * @param {string} id - MongoDB user _id
 * @returns {string} JWT token
 */
module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "3d", // Same as 3 * 24 * 60 * 60
  });
};
