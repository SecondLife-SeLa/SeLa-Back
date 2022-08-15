const express = require('express');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options =
{
    host: '52.79.165.10',
    port: 3306, 
    user: 'tester',
    password: 'sela123$',
    database: 'sela'
}

const sessionStore = new MySQLStore(options);

app.use(session
    ({
        secret: 'Songhwee',
        resave:false,
        saveUninitialized:true,
        store:sessionStore
}));

app.get('/logintest', function (req, res){
    req.session.is_logined = true;
    req.session.name = 'SongHwee';
    req.session.save(function(){
        res.send('help me Song');
    })
})

app.listen(3001, () => {
    console.log('서버가동');
});


