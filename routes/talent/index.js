// launch modules
module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @description talent main page
   * @method get
   * @returns talent db data
   */
  router.get("/", (req, res) => {
    db.loadPostList('talent', req.body.category, req.body.page, (result) => {
      res.send(result)
    })
  });

  return router;
}