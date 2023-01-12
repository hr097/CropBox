
// dependencies 

const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express(); 
// const http = require('http');
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');


//DB connection
const uri = "mongodb+srv://vercel-admin-user:e4oVmsOLn8qcHPmg@cropbox.gn6wpxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect().then( () => {
  console.log('Connected to the database ');
})
.catch( (err) => {
  console.error(`Error connecting to the database. n${err}`);
});

// app.get('/',(req,res)=>{
//     app.use(express.static(path.resolve(__dirname, 'cropbox','build')))
//     res.sendFile(path.resolve(__dirname,'cropbox','build','index.html'))
// });

//TODO: SUBMIT FEEDBACK API

/*
sample call object:

 {   
    "api_token" : "cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261",
    "name": "Harshil Ramani",
    "email": "harshilramani9777@gmail.com",
    "rating": 5,
    "description": "It's an amazing app!"
}

*/

app.post('/api/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   res.status(400).send('No files were uploaded.');
  //   return;
  // }

  res.send('File data : ' + req.files.pdf.data);

  // sampleFile = req.files.sampleFile;

  // uploadPath = __dirname + '/uploads/' + sampleFile.name;

  // sampleFile.mv(uploadPath, function(err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   res.send('File uploaded to ' + uploadPath);
  // });
});



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

app.get("/api/testapi", (req, res) => {
      return res.send("It's good to go!");
});
  
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
  

app.get("/",(req,res)=>{
    console.log(path.resolve(path.resolve(__dirname,".."), 'client','build'));
    app.use(express.static(path.resolve(path.resolve(__dirname,".."), 'client','build')))
    res.sendFile(path.resolve(path.resolve(__dirname,".."),'client','build','index.html'))
})

app.listen(port, () => console.log(`Server Running on port ${port}`));
module.exports = app;