// Read .env file
require("dotenv").config();

// Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");
// variables
const port = 8080;
const staticDir = "../ui/dist";

// Set up middleware

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, staticDir)));
app.use(routes);

// Default Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, "index.html"));
});

// Listen
app.listen(port, () => console.log(`Server is listening on port ${port}`));
