// model에서 내보내는 model 중에 Todo를 가져옵니다.
const { Todo } = require('model');

// Todo관련 모든 리스트 불러오기
exports.find = (req, res) => {
  Todo.find({}).exec((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}

// 일정 id를 통하여 데이터 불러오기
exports.findOne = (req, res) => {
  const _id = req.params.id;
  Todo.find({ _id }).exec((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}

// 데이터에 맞춰서 데이터 생성
exports.create = (req, res) => {
  const data = req.body;
  const todo = new Todo(data);

  todo.save((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}

// 일정 id의 내용을 수정
exports.update = (req, res) => {
  const _id = req.params.id;
  const data = req.body;

  Todo.update({ _id }, data).exec((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}

// 일정 id의 내용을 삭제
exports.destroy = (req, res) => {
  const _id = req.params.id;
  Todo.remove({ _id }).exec((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}

// 모든 일정 삭제
exports.destroyAll = (req, res) => {
  Todo.remove({}).exec((error, data) => {
    if (error) throw new Error(error);
    res.send(data);
  })
}