// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

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
            res.send(200, user[0]) // 로그인 성공
        } else{
          res.send(400, '비밀번호 불일치') // 비밀번호 불일치
        }
      } else {
        res.send(401, '아이디 불일치') // 아이디 불일치
      }
    })
  });

  return router;
}
  