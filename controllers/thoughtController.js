// const { Thought, User } = require('../models');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction')

module.exports = {
  async getThought(req, res) {  //GET Thought API
    
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
   
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No "Thought" found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new Thought
  async createThought(req, res) {
    try {
      // Create the thought
      const thought = await Thought.create(req.body);
  
      // Push the thought's _id to the associated user's thoughts array field
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create thought' });
    }
  },

  //Update Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No "Thought" found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Delete Thought
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId});

      if (!deleteThought) {
        return res.status(404).json({ message: 'No "Thought" found with this id!' });
      }


      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Creating a thought Reaction
async createThoughtReaction(req, res) {

  console.log("I am here")

  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    // Find the thought by its ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Create a new reaction
    const newReaction = {
      reactionBody,
      username,
      createdAt: new Date()
    };

    // Add the reaction to the thought's reactions array   
    const reaction = await Reaction.create(newReaction);
    thought.reactions.push(reaction.reactionId);

    // Save the updated thought
    await thought.save();

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
},

//Delete reaction from thought
async deleteReactionfromThought(req, res) {
  try {
    const { thoughtId } = req.params;
    const { reaction } = req.body;

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reaction: reaction } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.status(200).json({ message: 'Reaction removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

};

