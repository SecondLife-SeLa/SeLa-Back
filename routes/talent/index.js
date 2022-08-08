// launch modules
module.exports = (express, db, multer, multerS3, s3) => {
  const router = express.Router({ mergeParams: true });

  const talent_img_upload = multer({
    // use multer module to save image from symptom img upload
    storage: multerS3({
      s3: s3,
      bucket: "second_life_imgs/talent_img_upload",
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
  router.get("/write", talent_img_upload.single("img"), (req, res) => {
    // have to write code here
  });

  return router;
}