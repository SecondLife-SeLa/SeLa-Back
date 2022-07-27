// launch modules
module.exports = (express) => {
  const router = express.Router({ mergeParams: true });
  
  /**
   * @description router test
   * @method post
   * @returns req
   */
  // login page
  router.post("/", (req, res) => {
    res.send('받은 값: ' + req.body.id + ',' + req.body.pw);
  });

  return router;
}
  