const { Thought, User } = require('../models');

module.exports = {
  async getThought(req, res) {
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
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtIdId },
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


async createThoughtReaction(req, res) {

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
    thought.reactions.push(newReaction);

    // Save the updated thought
    await thought.save();

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
},


async deleteReactionfromThought(req, res) {
  try {
    const { thoughtId, reactionId } = req.params;

    // Find the thought by its ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Find the index of the reaction in the reactions array
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id.toString() === reactionId
    );

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Save the updated thought
    await thought.save();

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
}

};

