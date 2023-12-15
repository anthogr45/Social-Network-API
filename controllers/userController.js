const {User, Thought} = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findById({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUserandThoughtsbyId(req, res) {
    try {
      const deleteuser = await User.findOneAndRemove({ _id: req.params.userId });
      

      if (!deleteuser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Delete the user's associated thoughts
        await Thought.deleteMany({ username: deleteuser.username });


      res.json(message, 'User was successfully deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};
