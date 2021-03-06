const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db");
const utilsService = require("../_helpers/utils");
const User = db.User;

/**
 * @desc: Function is defined to login user into the application and sending jwt token back to the client
 * @param {*} param0 {username, password}
 * @returns Object
 */
const login = async ({ username, password }) => {
  if (username && password) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, {
        expiresIn: 60 * process.env.TOKEN_EXPIRATION_TIME,
      });
      return {
        ...user.toJSON(),
        token,
        token_expiry_time: `${process.env.TOKEN_EXPIRATION_TIME} minutes`
      };
    }
  } else {
    throw utilsService.errorObject("InvalidCredentials")
  }
};

/**
 * @desc: Function is defined to register/create a new user
 * @param {*} userParam 
 */
const create = async (userParam) => {
  // duplicate user name check
  if (await User.findOne({ username: userParam.username })) {
    throw utilsService.errorObject("UserNameAlreadyTaken");
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
};

/**
 * @desc: Function is defined to fetch all the users
 * @returns Array
 */
const getAll = async () => {
  return await User.find();
};


module.exports = {
  login,
  create,
  getAll,
};
