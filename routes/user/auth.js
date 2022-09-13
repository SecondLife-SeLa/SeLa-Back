const { Router } = require("express");

module.exports = (express, session, sessionStore) => {

    const router = express.Router({ mergeParams: true });
  
    router.use(session
      ({
          secret: 'JVLg|FZ0MFOmP~H',
          resave:false,
          saveUninitialized:true,
          store:sessionStore,
          saveUninitialized: true,
          cookie: { maxAge :600000 }, //10분 
          rolling : true  // rolling 새로고침시 maxage 갱신
    }));
  
    router.get('/', function(req, res) {
      const sess = req.session;
  
      if(sess.is_logined){
        let username = sess.name;
          res.status(200).send(`${username}님 안녕하세요`)
      } else {
          res.status(401).send("권한 없음") // 유효한 인증정보 x
      }
    });
    router.get('/correction', function(req, res) {
        const sess = req.session
        if(sess.name === req.body.id) {
            res.redirect('/') // 수정 라우터로 연결
        }else{
            res.status(401).send("수정 권한 없음")
        }
        
        
    })

    return router;
  }
    