const { User, Thought, Reaction } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'Anthony_G',
    email: 'anthony@gmail.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'Steff_G',
    email: 'steff@gmail.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'Frank_Silva',
    email: 'frank@gmail.com',
    thoughts: [],
    friends: []
  },
  // Add more user data as needed
];

const thoughtData = [
  {
    thoughtText: 'World is a cool place to live!',
    username: 'john_doe',
    reaction: []
  },
  {
    thoughtText: 'I love coding with Java!',
    username: 'jane_smith',
    reaction: []
  },
  {
    thoughtText: 'Hope all the world wars will en soon for Peace on Earth',
    username: 'Anthony_G',
    reaction: []
  },
  {
    thoughtText: 'I love the Canadian winter, specialy during Christmas!',
    username: 'Steff_G',
    reaction: []
  },
  {
    thoughtText: 'Ocean depth is so beutifull place to explore when there is bright sun light!',
    username: 'Frank_Silva',
    reaction: []
  },

];

const reactionData = [
  {
    reactionBody: 'Good Idea',
    username: 'Anthony_G'
  },
  {
    reactionBody: 'Love this thought',
    username: 'Frank_Silva'
  },
  {
    reactionBody: 'Thank you for this thought',
    username: 'Steff_G'
  },
  {
    reactionBody: 'Great thought. Thanks My friend.',
    username: 'john_doe'
  },
  {
    reactionBody: 'Thats beutifull. Amazing thought',
    username: 'jane_smith'
  },
];

module.exports = { userData, thoughtData, reactionData};
