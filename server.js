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



app.get("/api/get/:prenumerantnummer", (req, res) => {

  console.log(req.params.prenumerant);

   //const prenumerantnummer = 1;
   const prenumerantnummer = req.params.prenumerantnummer;

    const sqlSelect = `Select * FROM tbl_prenumeranter WHERE pre_id = ?`;
    connection.query(sqlSelect, [prenumerantnummer], (err, result) => {
       if(result){
            console.log(result);
            res.json(result[0]);
            console.log(result[0])
       }
       else{
         console.log(err)
        }

    return result;
  });
});



app.get("/api/post", (req, res) => {
  console.log("hejsan")

  // const prenumerantnummer = req.body.prenumerantnummer;
   const prenumerantnummer = 1;
   const personnummer = '9807029162';
   const fornamn = 'Oscar';
   const efternamn = 'Gilles';
   const adress = 'kongstrongvagen 3';
   const postnr = 29190;

   const sqlSelect = `UPDATE tbl_prenumeranter SET pre_persnr = ?, pre_fornamn = ?, pre_efternamn = ?, pre_adress = ?, pre_postnr = ?  WHERE pre_id = (?);`;


   connection.query(sqlSelect, [personnummer,fornamn, efternamn, adress, postnr, prenumerantnummer], (err, result) => {
     if(err){
       console.log(err)
     }
     else{
       console.log(result);
     }
 });
});




app.listen(port, () => {
    console.log(`app listening at port http://localhost:${port}`);
    console.log({ port });
  });