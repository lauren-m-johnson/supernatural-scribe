const express = require('express');
const router = express.Router();
const encountersCtrl = require('../../controllers/api/encounters');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST route to create a new encounter
router.post('/', ensureLoggedIn, encountersCtrl.create);

// GET route to retrieve a list of all encounters
router.get('/', encountersCtrl.list);

// PUT route to update an encounter by its ID
router.put('/:id', ensureLoggedIn, encountersCtrl.edit);

// DELETE route to delete an encounter by its ID
router.delete('/:id', ensureLoggedIn, encountersCtrl.remove);

module.exports = router;