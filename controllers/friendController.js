const {User, Thought} = require('../models/User');

module.exports = {
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
}
