const Comment = require('../../models/comment'); 

module.exports = {
  async createComment(req, res) {
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
  },

  async getComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      res.status(200).json(comment);
    } catch (error) {
      res.status(404).json({ error: 'Comment not found' });
    }
  },

  async getCommentsForEncounter(req, res) {
    try {
      const comments = await Comment.find({ encounter: req.params.encounterId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch comments' });
    }
  }
};