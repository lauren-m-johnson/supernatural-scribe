const Comment = require('../../models/comment');

// Create a new comment
async function createComment(req, res) {
  try {
    // Create a new Comment instance with data from the request body
    const comment = new Comment({
      text: req.body.text,
      createdBy: req.body.createdBy,
      encounter: req.body.encounter,
    });

    // Save the comment to the database
    await comment.save();
    
    // Populate the createdBy field with user's name and respond with the populated comment
    const populatedComment = await Comment.findById(comment._id).populate({
      path: 'createdBy',
      select: 'name',
    });

    // Respond with the populated comment
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create comment' });
  }
}

// Get a single comment by its ID
async function getComment(req, res) {
  try {
    // Find the comment by its ID
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
}

// Get all comments for a specific encounter
async function getCommentsForEncounter(req, res) {
  try {
    // Find all comments associated with a specific encounter and populate createdBy field
    const comments = await Comment.find({ encounter: req.params.encounterId }).populate({
      path: 'createdBy',
      select: 'name',
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch comments' });
  }
}

// Delete a comment
async function deleteComment(req, res) {
  try {
    // Extract comment ID from URL parameters
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user attempting to delete is the creator of the comment
    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Remove the comment from the database and respond with a success message
    await comment.remove();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createComment,
  getComment,
  getCommentsForEncounter,
  deleteComment,
};