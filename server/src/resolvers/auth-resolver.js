const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async ({ userName, password }) => {
  try {
    const existUser = await User.findOne({ userName })
    if(existUser) {
      throw new Error('UserName already used')
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ userName, password: hash });

    const user = await User.findOne({ userName });
    user.jwt = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET)

    return user;
  } catch(err) {
    console.log('error signup')
    return err;
  }
};

const login = async ({ userName, password }) => {
  try {
    const user = await User.findOne({ userName });
    if(!user) {
      throw new Error('UserName not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
      throw new Error('Password is incorrect');
    }

    user.jwt = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET);

    return user;
  } catch(err) {
    console.log('error login')
    return err;
  }
};

module.exports = {
  signup,
  login
};
