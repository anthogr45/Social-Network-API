const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { userData, thoughtData, reactionData } = require('./data');

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    const dataUsers = await User.create(userData);
    const dataThoughts = await Thought.create(thoughtData);
    const dataReactions = await Reaction.create(reactionData);

    // Link thoughts with users
    for (const thought of dataThoughts) {
      const user = dataUsers.find(user => user.username === thought.username);
      user.thoughts.push(thought._id);
      await user.save();
    }

    // Link reactions with thoughts
    for (const reaction of dataReactions) {
      const thought = dataThoughts[Math.floor(Math.random() * dataThoughts.length)];
      thought.reactions.push(reaction);
      await thought.save();
    }

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();