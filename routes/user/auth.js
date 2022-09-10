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
  
      if(req.session.is_logined){
        let username = sess.name;
          res.status(200).send(`${username}님 안녕하세요`)
      } else {
          res.status(401).send("권한 없음") // 유효한 인증정보 x
  }
  });
    return router;
  }
    