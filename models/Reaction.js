const { Schema, Types, model } = require('mongoose');
// Schema to create Reactions Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function dateFormat(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
