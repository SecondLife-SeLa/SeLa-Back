module.exports = (express, db, multer, multerS3, s3) => {
  const router = express.Router({ mergeParams: true });
  const user_img_upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "secondlifeserver/user_img_upload", //bucket 위치
      acl: "public-read",         //access control for the file (public 설정 해준다는 것 같음.)
      key: function (req, file, cb) {
        cb(
          null,
          Math.floor(Math.random() * 1000).toString() +
            Date.now() +                       // 두번째 인자로 이미지의 경로? 이름?으로 쓸거를 줌
            "." +
            file.originalname.split(".").pop()  //file.originalname은 원래 이미지의 이름
        );               // url은 리소스의 위치를 가리키는 문자열
      },                //.(".")) - .을 기준으로 문자열을 배열로 나눔
    }),                //.pop-배열에서 마지막 요소를 제거하고 그 값을 반환
  });

  /**
   * @description router test
   * @method get
   * @returns req
   */
  // login page
  router.get("/checkIdExists", (req, res) => {
    db.checkIdExists(req.body.id, (result) => {
      if (result[0].exist === 0){
        res.send('ok')
      } else if (result[0].exist === 1){
        res.send('exists')
      } else {
        res.send(404)
      }
    })
  });

  router.post("/", user_img_upload.any(), (req, res) => {
    console.log(req)
    let uri = ''
    if (req.files) {
      req.files.map(file => {
        uri += file.location + '|'
      })
      uri = uri.slice(0, -1) // 마지막 요소 추출 x (첫번째 요소부터 마지막에서 두번째 요소까지)
    }
    const client = req.body;
    // db.insertUserinfo(req.body.id, req.body.pw, req.body.name, req.body.birth, req.body.img, req.body.tag, req.body.career, req.body.intro, req.body.intro_one, () => {
    //   res.send('ok') 
    db.insertUserinfo(client.id, client.pw, client.name, client.birth, uri, client.tag, client.career, client.intro, client.intro_one, () => {
      res.send('ok')
    })
  });
  

  return router;
}

