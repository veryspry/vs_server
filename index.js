const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 8080;

const router = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send("api");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("404: not found");
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
