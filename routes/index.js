module.exports = (express) => {

  const router = express.Router({ mergeParams: true });

  router.get('/', function(req, res){
    res.send('루트입니다.')
  });

  return router;
}
  

