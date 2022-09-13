const express = require('express')
const app = express()
app.use(express.json())

const port = 3333;

/**
 * @description app settings
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * @description initialize db
 */
const db = require("./db/query.js");

/**
 * @description set cors
 */
const cors = require('cors')
app.use(cors())

/**
 * @description multer & aws
 */
const aws = require("aws-sdk");
aws.config.loadFromPath("./config/awsconfig.json");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();

/**
 * @description session & auth
 */
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/db.json'));
const auth = require('./routes/user/auth')

/**
 * @description router import
 */
const indexRouter = require("./routes/")(express, session, sessionStore);
app.use("/", indexRouter);
const authRouter = require("./routes/user/auth")(express, session, sessionStore);
app.use("/auth", authRouter)
const loginRouter = require("./routes/user/login")(express, db, session, sessionStore);
app.use("/login", loginRouter);
const registerRouter = require("./routes/user/register")(express, db, multer, multerS3, s3);
app.use("/register", registerRouter);
const communityRouter = require("./routes/community/index")(express, db, multer, multerS3, s3);
app.use("/community", communityRouter);
const talentRouter = require("./routes/talent/index")(express, db, multer, multerS3, s3);
app.use("/talent", talentRouter);
const jobRouter = require("./routes/job/index")(express, db, multer, multerS3, s3);
app.use("/job", jobRouter);
const lectureRouter = require("./routes/lecture/index")(express, db, session, sessionStore);
app.use("/lecture", lectureRouter);
const likeRouter = require("./routes/like/index")(express, db, session, sessionStore);
app.use("/like", likeRouter);


app.listen(port, function() {
    console.log(`Second Life back-end server listening on port ${port}`)
}) 