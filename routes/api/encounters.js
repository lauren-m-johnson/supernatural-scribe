const express = require('express');
const router = express.Router();
const encountersCtrl = require('../../controllers/api/encounters'); // Adjust the path based on your project structure

router.post('/', encountersCtrl.create);
router.get('/', encountersCtrl.list);

module.exports = router;