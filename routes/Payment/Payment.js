const express = require("express");
var router = express.Router();
let payment = require("../../models/Payment");
let path = require("path");

router.route("/pay").post((req, res) => {
  var UserName = req.body.UserName;
  var Total = req.body.Total;

  const payments = new payment({
    UserName,
    Total
  });

  payments
    .save()
    .then(() => {
      res.status(200).send({ status: "payment success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "payment Error" });
    });
});

module.exports = router;
