const { model, Schema } = require('mongoose');

const userRegisterSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
  },
  { timestamps: true }
);

module.exports = model('users', userRegisterSchema);
