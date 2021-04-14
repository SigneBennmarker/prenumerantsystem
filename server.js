var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = 5001;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "prenumerantsystem",
});

connection.connect();


console.log("hejsan pernillissss");

app.listen(port, () => {
    console.log(`app listening at port http://localhost:${port}`);
    console.log({ port });
  });