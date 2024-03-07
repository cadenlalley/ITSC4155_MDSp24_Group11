const express = require("express");

const app = express();

const host = "localhost";
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
