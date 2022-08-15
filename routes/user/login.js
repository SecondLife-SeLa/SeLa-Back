// launch modules
module.exports = (express, db, session, MySQLStore) => {

const router = express.Router({ mergeParams: true });
const app = express();
// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);

// const options =
// {
//     host: '52.79.165.10',
//     port: 3306, 
//     user: 'tester',
//     password: 'sela123$',
//     database: 'sela'
// }

// const sessionStore = new MySQLStore(options);

// app.use(session
//     ({
//         secret: 'Songhwee',
//         resave:false,
//         saveUninitialized:true,
//         store:sessionStore
// }));

  /**
   * @description router test
   * @method post
   * @returns req
   */
  // login page
  router.post("/", (req, res) => {
    const client = req.body;
    db.getUserInfo(client.id, (user) => {
      if (user[0]) { // client.id와 일치하는 값이 db에 없어서 user에 undefined가 넘어옴
        if (user[0].id === client.id && user[0].pw === client.pw) {
          // 세션 유지
          req.session.islogined =  true;
          req.session.sessionId =  user[0].id
          res.status(200).send(user[0]) // 로그인 성공
        } else{
          res.status(400).send("비밀번호 불일치") // 비밀번호 불일치
        }
      } else {
        res.status(401).send("아이디 불일치") // 아이디 불일치
      }
    })
  });

  return router;
}
  