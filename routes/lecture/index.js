// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @description lecture main page
   * @method get
   * @returns lecture db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('lecture', req.query.category, req.query.page, (result) => {
      res.send(result)
    })
  });

  return router;
}