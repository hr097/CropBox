const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://vercel-admin-user:e4oVmsOLn8qcHPmg@cropbox.gn6wpxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect().then( () => {
  console.log('Connected to the database ');
})
.catch( (err) => {
  console.error(`Error connecting to the database. n${err}`);
});

// SUBMIT FEEDBACK API
app.post("/api/submitfeedback", (req, res) => {
  
  const user = req.body;

  if(user.crsfToken == "1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261itie")
  {
  
  const Review = {
    name: user.name,
    email: user.email,
    rating: user.rating,
    description: user.description 
  };
  client.db("CropBox").collection("UsersReview").insertOne(Review).then( (data) => {
    return res.send("Thank you! Your Feedback Posted Successfully.");
   })
   .catch( (err) => {
    return res.send(`Error connecting to the database. n${err}`);
   });

  }
  else
  {
    return res.send(`Invalid Request!!!!`);
  }

});

// GET FEEDBACKS API
app.get("/api/getfeedbacks", (req, res) => {
  
   res.send(req.body.howmany);

  // client.db("CropBox").collection("UsersReview").find({}).limit(req.body.howmany).toArray().then( (data) => {
  //   return res.send(data);
  //  })
  //  .catch( (err) => {
  //   return res.send(`Error connecting to the database. n${err}`);
  //  });
  
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