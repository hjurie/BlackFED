/**
 *  [ API ]
 *  주로 기준이 되는 키 값을 받아서 키값을 이용한 다른 데이터를 추출하여 반환하주는 것에 목적이 있습니다.
 *  
 *  - 보안 이슈
 *    - 보통 API를 구성할 때, 보안성을 위해 Gateway API를 두고 각자의 기능을 하는 API's를 내부 네트워크에 만듭니다.
 *    - Gateway API의 주된 업무는 Cors로 받아야 하는 사이트에서만 데이터를 받는 것을 체크하고 주소 또는 http headers에 존재하는 데이터를 이용하여 내부의 다른 API를 찾습니다.
 *    - 다른 API에서 데이터를 가공, 추출등을 하여 다시 Gateway API로 보내고 Gateway API는 Client에 값을 전달합니다.
 */

require('dotenv').config(); // 외부에서 설정한 데이터를 process.env로 불러 올수 있게 해줍니다.
const express = require('express');

// 다음과 같이 ./database, ./configuration 폴더형식이 아니게 사용하는 이유는 package.json에 실행시에 NODE_PATH=. 이라는 설정때문에 그렇습니다.
// 오류가 난다면 경로로 설정하거나 NODE_PATH=.을 설정해주세요.
const database = require('database');
const config = require('configuration');

const app = express();

const PORT = config.get('PORT');

/* Route */
app.get('/', (req, res) => {
  res.send('<h1>hi!</h1>');
});

/* Route */
app.get('/test', (req, res) => {
  res.send('<h1>test Hi!</h1>');
});

// 일정한 port 번호로 서버 구동합니다.
app.listen(PORT, async () => {
  console.log(`start server port: ${PORT}`);
  
  // async/await의 에러를 체크할 수 있는 방법이 try/catch이기 때문에 사용했습니다.
  // Database의 접속을 시도하고 성공시에 Database Connection이라는 문구를 찍고 실패시에는 해당하는 에러메세지를 띄웁니다.
  try {
    await database.connect();
    console.log('Database Connection');
  } catch(error) {
    console.error(error);
  }
});