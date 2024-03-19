const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const favicon = require('express-favicon');
const morgan = require('morgan');

const config = require("./config.js");
const mainRoutes = require('./routes/mainRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

//create app
const app = express();

//configure app
const uri = config.mongoURI;
const host = "localhost";
const port = 3000;

app.set("view engine", "ejs");

//connect to MongoDB
mongoose.connect(uri, {})
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server running at http://localhost:` + port);
        });
    })
    .catch(err => console.log(err.message));

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: uri }),
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon('./public/logo.ico'));
app.use(morgan('tiny'));

//set up connection to routes
app.use('/', mainRoutes);
app.use('/groups', groupRoutes);
app.use('/user', userRoutes);

/*
//set up error responses
app.use((req, res, next)=>{
    let err = new Error('The server cannot locate '+ req.url);
    err.status = 404;
    //next(err) calls the next error handler
    next(err);
});*/

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});
