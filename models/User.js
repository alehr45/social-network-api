const { Schema, model } = require('mongoose');
const User = model('User', UserSchema);

const UserSchema = new Schema({
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/]
    },
    thoughts: {
      
    },
    friends: {
      type: String,
    },
    toppings: []
  });
  

  module.exports = User;