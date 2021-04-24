var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Transactions = require("../transactions");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
"mongodb+srv://bcuser:bcuser@cluster0.spomk.azure.mongodb.net/store500Transactions?retryWrites=true&w=majority";
// "mongodb+srv://firstDB:bcuser@cluster0.qmusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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



/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});



/* post a new Transaction and push to Mongo -  modified by Ken Evans */
router.post('/NewTransaction', function(req, res) {

    let oneNewTransaction = new Transactions(req.body);  // call constuctor in Transactions code that makes a new mongo Transaction object
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



/* delete an existing Hanger record from Mongo DB */
router.delete('/DeleteHanger/:id', function (req, res) {
  Transactions.deleteOne({ _id: req.params.id }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Hanger successfully deleted" });
  });
});



/* put (update) one Hanger */
router.put('/UpdateHanger/:id', function (req, res) {
  Transactions.findById({ _id: req.params.id }, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      if (req.body.hangerName) {
        result.hangerName = req.body.hangerName;
      }
      if (req.body.construction) {
        result.construction = req.body.construction;
      }
      if (req.body.color) {
        result.color = req.body.color;
      }
      if (req.body.sturdiness) {
        result.sturdiness = req.body.sturdiness;
      }
      if (req.body.pantClips) {
        result.pantClips = req.body.pantClips;
      }
      const newResult = await result.save();
      if (newResult === result) {
        console.log(newResult);
        res.status(200).json(newResult);
      }
      else {
        res.status(404).json({ error: "Update save failed!" });
      }
    }
  });
});



  /* get one Hangers */
router.get('/FindHanger/:id', function(req, res) {
  console.log(req.params.id );
  Transactions.find({ _id: req.params.id }, (err, oneHanger) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneHanger);
  });
});

module.exports = router;
