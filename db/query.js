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

function loadPostList(type, category, page, callback) {
  let SQL
  let values
  if (type === 'community') {
    SQL = `SELECT * FROM community WHERE category = ? ORDER BY idx DESC LIMIT ?, 10`;
    values = [category, ((page - 1) * 20)];
  } else if (type === 'talent') {
    SQL = `SELECT * FROM talent ORDER BY idx DESC LIMIT ?, 10`;
    values = [((page - 1) * 20)];
  } else if (type === 'job') {
    SQL = `SELECT * FROM job WHERE category = ? ORDER BY idx`;
    values = [category];
  }

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

function getUserInfo(id, callback) {
  const SQL = `SELECT * FROM user WHERE id = ?`
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
  checkIdExists,
  loadPostList,
  getUserInfo
}