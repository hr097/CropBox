const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors());

  var data1 = "";

  async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
   
    console.log("Databases:");
    databasesList.databases.forEach(
      db => { 
      console.log(` - ${db.name}`)
      data1+=` - ${db.name}` 
    });
  };
  
  async function main(){

    const uri = "mongodb+srv://vercel-admin-user:e4oVmsOLn8qcHPmg@cropbox.gn6wpxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


app.get("/api/getfeedbacks", (req, res) => {

  res.send(data1);

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