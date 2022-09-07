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

function insertUserinfo(id, pw, name, birth, img, tag, career,intro,intro_one, callback){ 
  const SQL = "insert into user(id, pw, name, birth, img, tag, career,intro, intro_one) values (?, ?, ?, ?, ?, ?, ?, ?,?);";
  const values = [id, pw, name, birth, img, tag, career, intro, intro_one];
  con.query(SQL, values, (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err');
    }
    else {
      callback(result);
    }
  });
};

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
  } else if (type === 'lecture') {
    SQL = `SELECT id, name, img, intro_one FROM user`;
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

function insertTalent(category, title, content, fee, writer, end_time, uri, callback) {
  const SQL = `INSERT INTO talent(category, title, content, fee, writer, end_time, images, start_time) VALUES(?, ?, ?, ?, ?, ?, ?, NOW())`
  const values = [category, title, content, fee, writer, end_time, uri];

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

function insertJob(name, duty, career, area, edu, form, url, content, callback){ 
  const SQL = "insert into job(category, name, duty, career, area, edu, form, content, url, img) values (1, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  const values = [name, duty, career, area, edu, form, url, content];
  con.query(SQL, values, (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err');
    }
    else {
      callback(result);
    }
  });
};

module.exports = {
  checkIdExists,
  insertUserinfo,
  loadPostList,
  getUserInfo,
  insertTalent,
  insertJob
}