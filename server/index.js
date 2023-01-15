
// dependencies 

const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express(); 
const PythonShell = require('python-shell').PythonShell;
var scissors = require('scissors');
var fs = require('fs');
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






/*

1)header
"api_token":"cropBox1008kbno9uploadcrnsknuashkc5rjsnnr9yco2vlfgzw9nu5261"


2)body

"pdf" : {PDF-SHOULD-BE-UPLOADED}
"plateform" : "flipkart" / "meesho"


*/

app.post('/api/upload', function(req, res) {

  
  let fileExt = path.extname(req.files.pdf.name);

  //  if(req.headers['api_token'] != "cropBox1008kbno9uploadcrnsknuashkc5rjsnnr9yco2vlfgzw9nu5261")
  //  {
  //     res.send(JSON.stringify({"response":401}));//'Unauthorised Request!'
  //  }
  //  else 
  if (!req.files || Object.keys(req.files).length === 0) {
     res.send(JSON.stringify({"response":400}));//'No files were uploaded.'
   }
   else if(fileExt!=".pdf")
   {
     res.send(JSON.stringify({"response":406})); //"Only PDF file is allowed!!"
   }
   else if(req.body.plateform=="flipkart")
   {
   

     //TODO: PDF CROPING

      // Use and chain any of these commands...
    // var pdf = pdfspin(req.files.pdf.tempFilePath).crop(170, 23,255, 350) // left, bottom, right, top

    // pdf.pdfStream().pipe(fs.createWriteStream(req.files.pdf.name)).on('finish', function () {
    //   res.sendFile(req.files.pdf.name);
    //   console.log("We're done!");
    // })
    // .on('error', function (err) 
    // {
    //   res.send(JSON.stringify({"response":500}));
    // }); // PDF of compiled output

  
  
   // res.send('name: '+ req.files.pdf.name + ' Preference: '+ req.body.plateform +'\nFile stored : '+ req.files.pdf.tempFilePath);
    
    // let  pdf_name = req.files.pdf;
    // let uploadPath = req.files.pdf.tempFileDir  + pdf_name.name;
  
    // fs.rename(pdf_name.tempFilePath,pdf_name.tempFileDir+"/input.pdf",function(err){
    //   if(err) console.log("ERROR: "+ err);
    // })

    // Use the mv() method to place the file somewhere on your server
    // pdf_name.mv("input.pdf", function(err) {
    //   if (err)
    //     return res.status(500).send(err);
  
    //  // res.send('File uploaded!');
    // });
    
    
    // var pdf = scissors(__dirname  + pdf_name.name)
    // .crop(170, 23,255, 350) // offset in points from left, bottom, right, top (doesn't work reliably yet)
    // .pdfStream();
    
    // pdf.pdfStream().pipe(fs.createWriteStream(__dirname  + pdf_name.name)).on('finish', function(){
    //   res.sendFile(__dirname  + pdf_name.name+"1");
    //   console.log("We're done!");

    // }).on('error',function(err){
    //   res.send(JSON.stringify({"response":500}));
    // });
    PythonShell.run("index.py", null, function (err) {
      if (err) throw err;
      console.log('finished');
    });
    res.send('File finished!');

   }
   else if(req.body.plateform=="meesho")
   {
     res.send('name: '+ req.files.pdf.name +' Preference: '+ req.body.plateform +'\nFile stored : '+ req.files.pdf.tempFilePath);
   }
   else
   {
     res.send(JSON.stringify({"response":503})); //'Something went wrong!!'
   }
 
 });
 

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
  
  "api_token": "cropBox1008kbnsubmitfeedbackjsnnwtr9yco2vlfgzw9nu5261";

  
  2)body:
  
  {
      "numOfFeedBacks":10
  }
  
  */

app.get("/api/testapi", (req, res) => {
      return res.send("It's good to go!");
});
  
app.get("/api/getfeedbacks", (req, res) => {
    
    if(req.body.numOfFeedBacks!=undefined&&req.body.numOfFeedBacks!=0&&req.headers['api_token']=="cropBox1008kbnsubmitfeedbackjsnnwtr9yco2vlfgzw9nu5261")
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