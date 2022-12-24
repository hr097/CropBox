const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://vercel-admin-user:e4oVmsOLn8qcHPmg@cropbox.gn6wpxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();

app.get("/api/reviews", (req, res) => {
   
  let data =  client.db("CropBox").collection("UsersReview").find({}).toArray();
  let response  = "";
  for(i in data) 
  {
    response +=" - "+data[i];
  }
  //data = client.db().admin().listDatabases();
  res.send(response);
});

app.use(express.static(path.join(__dirname, "./index.html")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;