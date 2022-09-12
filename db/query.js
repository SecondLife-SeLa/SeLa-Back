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

function insertTalent(category, title, content, fee, writer, start_time, end_time, uri, callback) {
  const SQL = `INSERT INTO talent(category, title, content, fee, writer, start_time, end_time, images) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
  const values = [category, title, content, fee, writer, start_time, end_time, uri];

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
  const SQL = "insert into job(category, name, duty, career, area, edu, form, url, content) values (1, ?, ?, ?, ?, ?, ?, ?, ?);";
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

function correctTalent(category, title, content, fee, writer, end_time, start_time, uri, idx, callback){
  const SQL = 'update talent set category = ?, title = ?, content = ?, fee = ?, writer = ?, start_time = ?, end_time = ?, images = ? where idx = ?';
  con.query(SQL, [category, title, content, fee, writer, start_time, end_time, uri, idx], (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err');
    }
    else { 
      callback(result);
    }
  });
};

function getCommunityLike(idx, userid,  callback){
  const SQL = 'select * from community where idx = ? ';
  con.query(SQL, [idx, userid ], (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err')
    }
    else{
      callback(result);
    } 
  });
};


function getCommunityLikeList(idx, userid, callback){
  const SQL = 'select * from communitylike where idx = ? and userid = ?';
  con.query(SQL, [idx, userid], (err, result, field) => {
    if (err) {
      console.log(err);
      callback('err')
    }
    else{
      callback(result);
    } 
  });
};

function communityLike(status, idx, userid, callback){
  let SQL1
  let SQL2 
  const values = [idx, userid];
    if(status === 0){
      SQL1 = 'insert into communitylike(idx, userid) values(?, ?)';  
      SQL2 =  'update community set like_sum = like_sum + 1 where idx = ?';

    } else if (status === 1){
      SQL1 = 'delete from communitylike where idx = ? and userid = ?';  
      SQL2 = 'update community set  like_sum = like_sum - 1 where idx = ? ';
    } 

      con.query(SQL1, values, (err, result, field) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('success SQL1')
    }
      });
      con.query(SQL2, [idx, ], (err, result, field) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('success SQL2')
        }
          });
  }
  
  function getjobLike(idx, userid,  callback){
    const SQL = 'select * from job where idx = ? ';
    con.query(SQL, [idx, userid ], (err, result, field) => {
      if (err) {
        console.log(err);
        callback('err')
      }
      else{
        callback(result);
      } 
    });
  };
  
  
  function getjobLikeList(idx, userid, callback){
    const SQL = 'select * from joblike where idx = ? and userid = ?';
    con.query(SQL, [idx, userid], (err, result, field) => {
      if (err) {
        console.log(err);
        callback('err')
      }
      else{
        callback(result);
      } 
    });
  };
  
  function jobLike(status, idx, userid, callback){
    let SQL1
    let SQL2 
    const values = [idx, userid];
      if(status === 0){
        SQL1 = 'insert into joblike(idx, userid) values(?, ?)';  
        SQL2 =  'update job set like_sum = like_sum + 1 where idx = ?';
  
      } else if (status === 1){
        SQL1 = 'delete from joblike where idx = ? and userid = ?';  
        SQL2 = 'update job set  like_sum = like_sum - 1 where idx = ? ';
      } 
  
        con.query(SQL1, values, (err, result, field) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('success SQL1')
      }
        });
        con.query(SQL2, [idx, ], (err, result, field) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('success SQL2')
          }
            });
    }


  

module.exports = {
  checkIdExists,
  insertUserinfo,
  loadPostList,
  getUserInfo,
  insertTalent,
  insertJob,
  correctTalent,
  getCommunityLike,
  getCommunityLikeList,
  communityLike,
  getjobLike,
  getjobLikeList,
  jobLike
}





