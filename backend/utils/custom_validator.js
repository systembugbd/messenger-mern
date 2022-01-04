const validator = require('validator');

const ValidateReg = async (fields, files) => {
  try {
    const error = [];
    const { username, email, password, confirmPassword } = fields;
    if (!username) {
      error.push('Username is required');
    }
    if (!email) {
      error.push('Email is required');
    }
    if (email && !validator.isEmail(email)) {
      error.push('Email is not valid, Please provide a valid email');
    }
    if (!password) {
      error.push('Password is required');
    }
    if (!confirmPassword) {
      error.push('Confirm Password is required');
    }
    if (confirmPassword && confirmPassword !== password) {
      error.push('Confirm Password does not match, Please check');
    }
    if (Object.keys(files).length === 0) {
      error.push('Image is required');
    }
    return error;
  } catch (e) {
    return e;
  }
};

const validateLogin = async (email, password) => {
  try {
    const error = [];
    if (!email) {
      error.push('Email is required');
    }
    if (!password) {
      error.push('Password is required');
    }
    if (email && !validator.isEmail(email)) {
      error.push('Please enter a valid email');
    }
    return error;
  } catch (e) {
    return e;
  }
};
module.exports = {
  ValidateReg,
  validateLogin,
};
