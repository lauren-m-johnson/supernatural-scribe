const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');

router.post('/', commentsCtrl.createComment);
router.get('/:id', commentsCtrl.getComment);
router.get('/encounter/:encounterId', commentsCtrl.getCommentsForEncounter);
router.delete('/:commentId', commentsCtrl.deleteComment);

module.exports = router;