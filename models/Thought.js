const { Schema, model } = require("mongoose");
const Thought = model('Thought', ThoughtSchema);

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    type: String,
    
  },
  toppings: [],
});


module.exports = Thought;