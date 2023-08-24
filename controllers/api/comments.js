const Comment = require('../../models/comment');

async function createComment(req, res) {
  try {
    const comment = new Comment({
      text: req.body.text,
      createdBy: req.body.createdBy,
      encounter: req.body.encounter,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create comment' });
  }
}

async function getComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
}

async function getCommentsForEncounter(req, res) {
  try {
    const comments = await Comment.find({ encounter: req.params.encounterId }).populate('createdBy');
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch comments' });
  }
}

module.exports = {
  createComment,
  getComment,
  getCommentsForEncounter,
};