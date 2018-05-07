const express = require('express');
const router = express.Router();
const todo = require('./todo');
const auth = require('./auth');

// API 첫페이지 접속
router.get('/', (req, res) => {
  res.send('<h1>Welcome NodeJS</h1>');
});

// API요청시 일정 작업에 따라 주소를 분리하기 위함
router.use('/todo', todo);
router.use('/auth', auth);

module.exports = router;