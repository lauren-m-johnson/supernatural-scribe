const express = require('express');
const router = express.Router();
const encountersCtrl = require('../../controllers/api/encounters');
const isLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', encountersCtrl.create);
router.get('/', encountersCtrl.list);
router.put('/:id', isLoggedIn, encountersCtrl.edit);
router.delete('/:id', isLoggedIn, encountersCtrl.remove);

module.exports = router;