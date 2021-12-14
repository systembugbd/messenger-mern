const formidable = require('formidable');

const path = require('path');
const fs = require('fs');
const User = require('../models/userRegisterSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ValidateReg = require('../utils/custom_validator');

//User Registration Image Uploading and Token Generator and Response back to
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @register user
 */
const userRegisterController = async (req, res, next) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { username, email, password, confirmPassword } = fields;

    const error = await ValidateReg(fields, files);

    console.log(error);
    //Check is there is any error inside in error array if yes then send res 400
    if (error.length > 0) {
      res.status(400).json({ error: { errorMessage: error } });
    } else {
      const getImageName = files.image.originalFilename;
      const randomNum10 = Math.floor(Math.random() * Date.now());
      const newImageName = `${randomNum10}_${getImageName}`;
      files.image.originalFilename = newImageName;

      const originalImagePath = files.image.filepath;

      const newImageUploadingPath = path.join(
        __dirname,
        '../../frontend/public/images/user',
        newImageName
      );

      try {
        const checkUserExists = await User.findOne({ email: email });
        if (checkUserExists) {
          res.status(403).json({
            error: {
              errorMessage: [
                'User already exists, please try with another email',
              ],
            },
          });
        } else {
          fs.copyFile(
            originalImagePath,
            newImageUploadingPath,
            async (error) => {
              if (!error) {
                //insert a user in mongodb database using create User.create
                const createNewUser = await User.create({
                  username,
                  email,
                  password: await bcrypt.hash(password, 256),
                  image: files.image.originalFilename,
                });
                //generate authToken
                const token = jwt.sign(
                  {
                    id: createNewUser._id,
                    email: createNewUser.email,
                    username: createNewUser.username,
                    image: createNewUser.image,
                    registrationTime: createNewUser.createdAt,
                  },
                  process.env.SECREAT_KEY,
                  { expiresIn: process.env.TOKEN_EXPIRES_IN }
                );
                //create cookie option with expires time in milisecond
                const options = {
                  expires: new Date(
                    Date.now() *
                      process.env.COOKIE_EXPIRES_IN *
                      24 *
                      60 *
                      60 *
                      1000
                  ),
                };
                res.status(201).cookie('authToken', token, options).json({
                  successMessage: 'User Registration Successfull',
                  token,
                });
              } else {
                res.status(500).json({
                  error: {
                    errorMessage:
                      'Internal Server Error, Image could not upload',
                  },
                });
              }
            }
          );
        }
      } catch (error) {
        res.status(500).json({ error: { errorMessage: error } });
      }

      // res.status(200).json({ message: 'Registration is successfull' });
    }
  });
};

module.exports = userRegisterController;
