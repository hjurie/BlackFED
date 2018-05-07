const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoose를 이용한 스키마 설정 & 컬렉션 설정
const TodoSchema = new Schema({
  isComplete: { type: Boolean, default: false },
  content: { type: String, required: true },
  createdAt: { type: Date, default: new Date },
  completedAt: { type: Date, default: null }
}, { collection: 'todo' });

// model 생성
const Todo = mongoose.model('Todo', TodoSchema);

// 다음과 같이 ES6 기능을 이용하여 여러개의 model을 내보내 줄수 있습니다.
module.exports = { Todo }