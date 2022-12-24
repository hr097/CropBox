const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/test/best", (req, res) => {
  res.send("successful/best");
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