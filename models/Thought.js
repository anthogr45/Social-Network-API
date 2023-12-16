const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
      
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// thoughtSchema.methods.getters = function() {
//   return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss'); 
// };

function dateFormat(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
    
  
  
const Thought = model('Thought', thoughtSchema);
  
module.exports = Thought;
  
