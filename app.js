const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const favicon = require('express-favicon');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const config = require("./config.js");
const mainRoutes = require('./routes/mainRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const challengeRoutes = require('./routes/challengeRoutes');

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
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon('./public/logo.ico'));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up connection to routes
app.use('/', mainRoutes);
app.use('/groups', groupRoutes);
app.use('/user', userRoutes);
app.use('/friends', friendRoutes);
app.use('/challenges', challengeRoutes);


//set up error responses
app.use((req, res, next)=>{
    let err = new Error('The server cannot locate '+ req.url);
    err.status = 404;
    //next(err) calls the next error handler
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    let activePage = 'home';
    res.status(err.status);
    res.render('error', { error: err , activePage});
});
