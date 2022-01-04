const validator = require('validator');
const bcrypt = require('bcrypt');
const users = require('../models/userRegisterSchema');
const { validateLogin } = require('../utils/custom_validator');
const jwt = require('jsonwebtoken');

/**
 * Handle User Login
 * @param {Object} req
 * @param {Obejct} res
 * @param {fn} next
 * @returns
 */
const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;

  const error = await validateLogin(email, password);

  if (error.length > 0) {
    res.status(400).json({ error: { errorMessage: error } });
  } else {
    try {
      const checkUser = await users
        .findOne({ email: email })
        .select('+password');

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              username: checkUser.username,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECREAT_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES_IN }
          );

          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
          };
          res.status(201).cookie('authToken', token, options).json({
            successMessage: 'Successfully logged in',
            token,
          });
        } else {
          res.status(404).json({
            error: { errorMessage: 'Invalid Password, Please Check Password' },
          });
        }
      } else {
        res.status(404).json({
          error: { errorMessage: 'User not found, Please check Email Address' },
        });
      }
    } catch (error) {
      res.status(500).json({ error: { errorMessage: error.message } });
    }
  }
};

module.exports = userLoginController;
