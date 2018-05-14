// MongoDB를 콘트롤 하기 위해 Mongoose라는 라이브러리를 사용합니다.
const mongoose = require('mongoose');
const config = require('configuration');

// Mongoose 내부에 Promise를 사용하는데 어떤 Promise를 사용할건지 물어봅니다.
// 예전에 Promise기능이 없을 때, Promise 기능을 하는 라이브러리가 여러개 나왔었습니다.
mongoose.Promise = global.Promise; // Javascript에서 지원하는 Promise를 사용합니다.

// configuration에 설정한 데이터를 불러옵니다.
// Prod, Dev 버전을 구분하여 값을 가져오고, 코드상에 비밀번호등을 관리하지 않기 위함입니다.
const DB_USER = config.get('DB_USER');
const DB_PASSWD = config.get('DB_PASSWD');
const DB_NAME = config.get('DB_NAME');

// connect를 실행하면 동작합니다.
exports.connect = () => {
  // 데이터베이스의 접속 여부체크는 비동기성이기 때문에 프로미스를 사용합니다.
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWD}@ds259119.mlab.com:59119/${DB_NAME}`);
    const connection = mongoose.connection;

    connection.on('error', reject);
    connection.once('open', resolve);
  });
}