const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 280,
  },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


<<<<<<< HEAD
module.exports = reactionSchema; 
=======
module.exports = reactionSchema;
>>>>>>> 780e856d072a516397487c21c53e27356cefd182
