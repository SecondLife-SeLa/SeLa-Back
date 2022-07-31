const express = require('express')
const app = express()
app.use(express.json())

const port = 3000;

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
 * @description router import
 */
const indexRouter = require("./routes/")(express);
app.use("/", indexRouter);
const loginRouter = require("./routes/login/login")(express);
app.use("/login", loginRouter);
const registerRouter = require("./routes/login/register")(express, db);
app.use("/register", registerRouter);

app.listen(port, function() {
    console.log(`Second Life back-end server listening on port ${port}`)
}) 