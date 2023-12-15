const User = require('../models/User');
const Thought = require('../models/Thought');
const mongoose = require('mongoose');

module.exports = {
  async getUsers(req, res) {
    console.log("I am Here XXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    console.log("I am Here XXXXXXXXXXXXyyyyyyyyyyyyyyyyy")
    try {
      const user = await User.findById({ _id: req.params.userId })
        // .populate('thoughts')
        // .populate('friends');

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

  async deleteUserandThoughts(req, res) {

    const dduser = req.params.userId
    // console.log("Delete I am Here XXXXXXXXXXXXXXXXXXXXXXXXXXXX" + dduser )
    try {
      console.log("Delete I am Here XXXXXXXXXXXXXXXXXXXXXXXXXXXX" )
      // const userId = mongoose.Types.ObjectId(req.params.userId);
      // console.log("Delete I am Here XXXXXXXXXXXXXXXXXXXXXXXXXXXX" )

      const duser= await User.findOne({ _id: dduser});
      // console.log("Userrrrrrrrrrrrrrrr" + duser);
      const deleteuser = await User.findOneAndRemove({ _id: req.params.userId});
      
      console.log("Deleted" + deleteuser);

      if (!deleteuser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Delete the user's associated thoughts
        const dthought =  await Thought.deleteMany({ username: deleteuser.username });

        console.log("Deleted THoutgh 000000000" + dthought);


      res.status(200).json(dthought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // create a friend
    async createFriend(req, res) {
      try {
          const { userId, friendId } = req.params;
      
          // Find the user by their userId
          const user = await User.findById(userId);
      
          // Find the friend by their friendId
          const friend = await User.findById(friendId);
      
          // Check if the user and friend exist
          if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
          }
      
          // Add the friend to the user's friend list
          user.friends.push(friendId);
      
          // Save the updated user
          await user.save();
      
          res.status(200).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ err});
        }
      },
  
      //Delete a friend
    async deleteFriend(req, res) {
      try {
          const { userId, friendId } = req.params;
      
          // Find the user by their userId
          const user = await User.findById(userId);
      
          
          if (!user) {
            return res.status(404).json({ error: 'User or friend not found' });
          }
      
          // Remove the friend from the user's friend list
          user.friends.pull(friendId);
      
          // Save the updated user
          await user.save();
      
          res.status(200).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ err});
        }
    
      }
  
};
