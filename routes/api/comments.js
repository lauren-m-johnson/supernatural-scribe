const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');

// POST route to create a new comment
router.post('/', commentsCtrl.createComment);

// GET route to retrieve a specific comment by its ID
router.get('/:id', commentsCtrl.getComment);

// GET route to retrieve all comments for a specific encounter by its ID
router.get('/encounter/:encounterId', commentsCtrl.getCommentsForEncounter);

// DELETE route to delete a comment by its ID
router.delete('/:commentId', commentsCtrl.deleteComment);

module.exports = router;