const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
  deleteReactionfromThought,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThought).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createThoughtReaction).delete(deleteReactionfromThought);


module.exports = router;
