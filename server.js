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



app.get("/api/get/:id", (req, res) => {


   //const prenumerantnummer = 1;
   console.log(req.params)
   const prenumerantnummer = req.params.id;

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



app.put("/api/put", (req, res) => {
  console.log("halli hallåe")

  const prenumerantnummer = req.body.pre_id;
  console.log("hämtat prennr", prenumerantnummer);
   const personnummer = req.body.pre_persnr;
   console.log("hämtat personnummer", personnummer);

   const fornamn =  req.body.pre_fornamn;
   const efternamn = req.body.pre_efternamn;
   const adress = req.body.pre_adress;
   const postnr = req.body.pre_postnr;


   const sqlSelect = `UPDATE tbl_prenumeranter SET pre_persnr = ?, pre_fornamn = ?, pre_efternamn = ?, pre_adress = ?, pre_postnr = ?  WHERE pre_id = (?);`;


   connection.query(sqlSelect, [personnummer,fornamn, efternamn, adress, postnr, prenumerantnummer], (err, result) => {
     if(err){
       console.log("error: ", err)
     }
     else{
       console.log("result: ", result);
     }
 });
});




app.listen(port, () => {
    console.log(`app listening at port http://localhost:${port}`);
    console.log({ port });
  });