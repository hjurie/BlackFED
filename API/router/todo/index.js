const express = require('express');
const router = express.Router();
const ctrl = require('./controller');

// REST API 구성에 맞춰서 작성하고 controller에 연결하여 나누어줍니다.
router.get('/', ctrl.find);
router.get('/:id', ctrl.findOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);
router.delete('/', ctrl.destroyAll);

module.exports = router;