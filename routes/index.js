var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Transactions = require("../transactions");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
//"mongodb+srv://bcuser:bcuser@cluster0.spomk.azure.mongodb.net/store500Transactions?retryWrites=true&w=majority";
 "mongodb+srv://firstDB:bcuser@cluster0.qmusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


/* Code to handle the pseudo time - created by Ken Evans */
var tHourPurch = 0;
var tDayPurch = 0;

function pseudoTime() {
  tHourPurch = tHourPurch + (Math.floor(Math.random() * 5) + 1);
  if (tHourPurch > 23) {
    tHourPurch = tHourPurch - 23;
    tDayPurch = tDayPurch + 1;
  }
  if (tDayPurch > 364) {
    tDayPurch = 0;
  }
}



/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});



// post a new Transaction and push to Mongo -  modified by Ken Evans 
 router.post('/NewTransaction', function(req, res) {

  pseudoTime();
  req.body.HourPurch = tHourPurch;
  req.body.DayPurch = tDayPurch;

  let oneNewTransaction = new Transactions(req.body);

  console.log(req.body);
  
  oneNewTransaction.save((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log(transaction);
      res.status(201).json(transaction);
    }
  });
}); 



/* post 500 Transaction and push to Mongo -  modified by Khalid Mohamed */
router.post('/FiveHundredTransactions', function(req, res) {

  pseudoTime();
  req.body.HourPurch = tHourPurch;
  req.body.DayPurch = tDayPurch;

  let oneNewTransaction = new Transactions(req.body);

  console.log(req.body);
  
  oneNewTransaction.save((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log(transaction);
      res.status(201).json(transaction);
    }
  });
});

module.exports = router;
