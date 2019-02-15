const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const titleize = require("underscore.string/titleize");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD
    }
  })
);

router.post("/auth", (req, res) => {
  res.end("request received");
});

router.post("/contact-form", (req, res) => {
  const defaultEmail = "veryspry.email@gmail.com";
  const { name, email, message } = req.body;

  let formattedName = titleize(name.trim());

  if (formattedName.length === 0) formattedName = "Unidentified Person";

  const mailOptions = {
    from: email,
    to: defaultEmail,
    subject: `${formattedName}, contacted you at veryspry.com`,
    html: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error submitting message", err);
      res.status(500).send(err);
    } else {
      console.log("INFO", info);
      res.status(200).send(info);
    }
  });
});

module.exports = router;
