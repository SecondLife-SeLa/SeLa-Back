// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  const talent_img_upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "secondlifeserver/talent_img_upload",
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
   * @description talent main page
   * @method get
   * @returns talent db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('talent', req.query.category, req.query.page, (result) => {
      res.send(result)
    })
  });

  /**
   * @description talent write page
   * @method post
   * @returns status code
   */
  router.post("/write", talent_img_upload.array("img"), (req, res) => {
    let uri = ''
    req.files?.map(file => {
      uri += file.location + '|'
    })
    uri = uri.slice(0, -1)
    db.insertTalent(req.body.category, req.body.title, req.body.content, req.body.fee, req.body.writer, req.body.end_time, uri, () => {
      res.sendStatus(200)
    })
  });

  return router;
}