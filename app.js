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
 * @description session
 */
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/db.json'));

/**
 * @description router import
 */
const indexRouter = require("./routes/")(express);
app.use("/", indexRouter);
const loginRouter = require("./routes/user/login")(express, db, session, sessionStore);
app.use("/login", loginRouter);
const registerRouter = require("./routes/user/register")(express, db);
app.use("/register", registerRouter);
const communityRouter = require("./routes/community/index")(express, db, multer, multerS3, s3);
app.use("/community", communityRouter);
const talentRouter = require("./routes/talent/index")(express, db, multer, multerS3, s3);
app.use("/talent", talentRouter);
const jobRouter = require("./routes/job/index")(express, db);
app.use("/job", jobRouter);

app.listen(port, function() {
    console.log(`Second Life back-end server listening on port ${port}`)
}) 