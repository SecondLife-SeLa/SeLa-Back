module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @description router test
   * @method get
   * @returns req
   */
  // login page
  router.get("/checkIdExists", (req, res) => {
    db.checkIdExists(req.query.id, (result) => {
      if (result[0].exist === 0){
        res.send('ok')
      } else if (result[0].exist === 1){
        res.send('exists')
      } else {
        res.send(404)
      }
    })
  });

  return router;
}