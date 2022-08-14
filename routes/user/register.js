module.exports = (express, db) => {
  const router = express.Router({ mergeParams: true });

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

  router.post("/", (req, res) => {
    const client = req.body;
    db.insertUserinfo(req.body.id, req.body.pw, req.body.name, req.body.birth, req.body.img, req.body.tag, req.body.career, req.body.intro, req.body.intro_one, () => {
      res.send('ok')
    })
  });
  

  return router;
}