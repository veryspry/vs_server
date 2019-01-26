const express = require("express");
const router = express.Router();

router.post("/auth", (req, res) => {
  console.log("req", req.body);

  res.end("request received");
});

module.exports = router;
