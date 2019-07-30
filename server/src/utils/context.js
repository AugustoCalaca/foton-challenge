const connect = require('../services/database');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

const getUser = async (authorization) => {
  const bearerLength = "Bearer ".length;

  // check authorization
  if(authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve => {
      jwt.verify(token, process.env.AUTH_SECRET, (err, result) => {
        if(err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result
          });
        }
      })
    });

    if(ok) {
      const user = User.findOne({ _id: result._id });
      return user;
    } else {
      console.log(result);
      return null;
    }
  }

  return null;
};

const context = ({ req }) => {
  const { authorization } = req.headers;
  const user = getUser(authorization);

  return {
    user
  };
};

module.exports = context;
