const express = require("express");
const config = require("./config.sample.js");
const mongoose = require("mongoose");
const mainRoutes = require('./routes/mainRoutes');

const uri = config.mongoURI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const app = express();

const host = "localhost";
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRoutes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
