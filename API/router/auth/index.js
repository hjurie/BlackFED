const express = require('express');
const router = express.Router();
const ctrl = require('./controller');

router.get('/', ctrl.find);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;