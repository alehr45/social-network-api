const { Schema, model } = require('mongoose');


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
    }
  });
  
  const User = model('User', UserSchema);

  module.exports = User;