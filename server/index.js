
//TODO: DEPENDENCIES

const path = require('path');
const express = require('express');
const app = express(); 
const logger = require("morgan");
const cors = require("cors");

//TODO: CONFIGURATION

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors())


const port = process.env.PORT || 3000;


//TODO: DATA BASE CONNECT


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vercel-admin-user:8bfdbld4aRo7AA7r@cropbox.gn6wpxt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(function(){
  console.log('Connected to the database ');
},function(){
  console.error(`Error connecting to the database. n${err}`);
})


//TODO: SUBMIT FEEDBACK API

/*
sample call object:

1)header:

"api_token" : "cropBox1008kbno9submitfeedbackk5rjsnnr9yco2vlfgzw9nu5261"

2)body:

{   
    "name": "Harshil Ramani",
    "email": "harshilramani9777@gmail.com",
    "rating": 5,
    "description": "It's an amazing app!"
}

*/




app.post("/api/submitfeedback", async (req, res) => {
  

    if(req.headers['api_token'] == "cropBox1008kbno9submitfeedbackk5rjsnnr9yco2vlfgzw9nu5261")
    {
    
      const user = req.body;

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
  
  2)header:
  
  "api_token": "cropBox1008kbngetfeedbackjsnnwtr9yco2vlfgzw9nu5261";

  
  2)body:
  
  {
      "numOfFeedBacks":10
  }
  
  */

  
app.get("/api/getfeedbacks", (req, res) => {
    if(req.query.numOfFeedBacks!=undefined&&req.query.numOfFeedBacks!=0&&req.headers['api_token']=="cropBox1008kbngetfeedbackjsnnwtr9yco2vlfgzw9nu5261")
    { 
      const setLimitX = req.query.numOfFeedBacks;
      client.db("CropBox").collection("UsersReview").find({}).sort({_id:-1}).limit(parseInt(setLimitX)).toArray().then( (data) => {
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
  
app.get("/api/testapi", (req, res) => {
  return res.send("It's good to go!");
});

app.get("/",(req,res)=>{
    console.log(path.resolve(path.resolve(__dirname,".."), 'client','build'));
    app.use(express.static(path.resolve(path.resolve(__dirname,".."), 'client','build')))
    res.sendFile(path.resolve(path.resolve(__dirname,".."),'client','build','index.html'))
})

app.listen(port, () => console.log(`Server Running on port ${port}`));
module.exports = app;