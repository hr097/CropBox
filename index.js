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

//TODO: SUBMIT FEEDBACK API

/*
sample object:

 {   
    "api_token" : "cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261",
    "name": "Harshil Ramani",
    "email": "harshilramani9777@gmail.com",
    "rating": 5,
    "description": "It's an amazing app!"
}

*/



app.post("/api/submitfeedback", async (req, res) => {
  
  const user = req.body;

  if(user.api_token == "cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261")
  {
  
  let curdate = new Date();
  curdate = curdate.toLocaleString();
  let rating = parseInt(user.rating);

  const myObj = {
    "name": user.name,
    "email": user.email,
    "rating": rating,
    "description": user.description,
    "feedback_time_stamp" : curdate
  };

    let result = await client.db("CropBox").collection("UsersReview").insertOne(myObj);

    if(result.acknowledged==true)
    res.send("Your Feedback Has Been Posted Successfully");
    else
    res.send("Unable to Post Feedback!!!")

  }
  else
  {
    res.send(`Invalid Request!!!!`);
  }

});

//TODO: GET FEEDBACKS API

/*
sample object:

header:

key: api_token
value : cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261

body:

{
    "numOfFeedBacks":10
}

*/

app.get("/api/getfeedbacks", (req, res) => {
  
  if(req.body.numOfFeedBacks!=undefined&&req.body.numOfFeedBacks!=0&&req.headers['api_token']=="cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261")
  { 
    const setLimitX = (req.body.numOfFeedBacks);
    client.db("CropBox").collection("UsersReview").find({}).limit(parseInt(setLimitX)).toArray().then( (data) => {
       res.send(data);
     })
     .catch( (err) => {
      res.send(`Error connecting to the database. n${err}`);
     });
  }
  else
  {
    return res.send("Invalid Request!");
  }

});

//TODO: MAIN ROUTE 

// app.use(express.static(path.join(__dirname, "./index.html")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

if(process.env.NODE_ENV == 'production')
{
  const path = require('path');
  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname, 'cropbox','build')))
    res.sendFile(path.resolve(__dirname,'cropbox','build','index.html'))
  })
}

//TODO: SERVER PORT DETAILS
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
module.exports = app;