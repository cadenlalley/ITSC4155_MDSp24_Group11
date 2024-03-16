const express = require("express");
const config = require("./config.js");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mainRoutes = require('./routes/mainRoutes');

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
            console.log(`Server running at http://localhost:`, port);
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
app.use(express.urlencoded({ extended: true }));

//set up connection to routes
app.use('/', mainRoutes);
/*
//set up error responses
app.use((req, res, next)=>{
    let err = new Error('The server cannot locate '+ req.url);
    err.status = 404;
    //next(err) calls the next error handler
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});*/
