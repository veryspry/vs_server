const express = require("express");
const router = express.Router();

router.post("/auth", (req, res) => {
  res.end("request received");
});

module.exports = router;
