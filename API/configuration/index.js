// get을 실행하면 동작합니다.
exports.get = key => {

  // Default로 같은 폴더에 있는 config.dev.json파일을 (Object) config 변수에 넣습니다. ( 이때 config 변수는 변경될 수 있으니 let으로 선언 )
  let config = require('./config.dev')
  // package.json에서 설정하여 실행시 설정된 NODE_ENV의 값이 production (배포)일 때
  if(process.env.NODE_ENV === 'production') {
    // config변수에 config.prod.json파일을 바꿔 넣습니다.
    config = require('./config.prod');
  }
  
  // 사용시에 불러온 key 값으로 내부의 값을 불러옵니다.
  return config[key];
}