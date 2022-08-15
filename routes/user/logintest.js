var express = require('express');
var app = express();
var session = require('express-session');                      
var MySQLStore = require('express-mysql-session')(session);    

var options ={                                                 
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '111111',
    database: 'login'
};
var sessionStore = new MySQLStore(options);                    

app.use(session({                                              
  secret:"asdfasffdas",
  resave:false,
  saveUninitialized:true,
  store: sessionStore                                         
}))


app.get('/logintest', function(req, res){
  req.session.is_logined = true;
  req.session.name = 'djfksl';
  req.session.save(function(){
      res.send('hello');
  })
})


    
app.listen(3001, () => {
    console.log("서버 가동");
});