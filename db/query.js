const db = require('./dbConnection.js');  // use mysql db connection
const con = db.init();

function checkIdExists(id, callback) {
  const SQL = `SELECT EXISTS(SELECT id FROM user WHERE id = ?) AS exist`
  const values = [id];

  con.query(SQL, values, (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err');
    }
    else {
      callback(result);
    }
  });
}

module.exports = {
  checkIdExists
}