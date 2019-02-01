// Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
// variables
const port = 8080;
// Components
const router = require("./routes/index");

// Set up middleware
app.use(morgan("dev"));
app.use(session({ secret: "app-secret" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(`${__dirname}/../ui/build`));

// Default Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "ui/build/index.html"));
});

// Listen
app.listen(port, () => console.log(`Server is listening on port ${port}`));
