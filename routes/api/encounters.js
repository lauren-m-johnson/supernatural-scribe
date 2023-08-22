const express = require('express');
const router = express.Router();
const encountersCtrl = require('../../controllers/api/encounters');
const isLoggedIn = require('../../config/ensureLoggedIn'); 

router.post('/', encountersCtrl.create);
router.get('/', encountersCtrl.list);
router.put('/encounters/:id', isLoggedIn, encountersCtrl.edit);

module.exports = router;