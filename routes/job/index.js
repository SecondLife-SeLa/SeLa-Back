// launch modules
module.exports = (express, db, multer, multerS3, s3) => {
  const router = express.Router({ mergeParams: true });

  const job_img_upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "secondlifeserver/job_img_upload",
      acl: "public-read",
      key: function (req, file, cb) {
        cb(
          null,
          Math.floor(Math.random() * 1000).toString() +
            Date.now() +
            "." +
            file.originalname.split(".").pop()
        );
      },
    }),
  });

  /**
   * @description job main page
   * @method get
   * @returns job db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('job', req.query.category, null, (result) => {
      res.send(result)
    })
  });

  /**
   * @description job write page
   * @method post
   * @returns status code
   */
    router.post("/",  job_img_upload.any(), (req, res) => {
      let uri = ''
      if (req.files) {
        req.files.map(file => {
          uri += file.location + '|'
        })
        uri = uri.slice(0, -1) // 마지막 요소 추출 x (첫번째 요소부터 마지막에서 두번째 요소까지)
      }
      const info = req.body
      db.insertJob(
        info.name, 
        info.duty, 
        info.career, 
        info.area, 
        info.edu, 
        info.form, 
        uri, 
        info.content, 
        (result) => {
          res.sendStatus(200)
      })
    });

  return router;
}