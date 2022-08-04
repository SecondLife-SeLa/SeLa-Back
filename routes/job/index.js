// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @description job main page
   * @method get
   * @returns job db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('job', req.body.category, null, (result) => {
      res.send(result)
    })
  });

  return router;
}