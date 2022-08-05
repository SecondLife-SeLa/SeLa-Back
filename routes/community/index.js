// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @description community main page
   * @method get
   * @returns community db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('community', req.body.category, req.body.page, (result) => {
      res.send(result)
    })
  });

  return router;
}